import { TestResult } from "./TestResult";
import { CodeLine } from "./CodeLine";
import * as path from "path";
import * as fs from "fs";

export class TestSample {

    private path: string;
    private lines: CodeLine[];
    private startLineCol: [number, number];

    constructor(private test: TestResult) {
        let stackLines = this.FindStackLines();
        let fileLines = this.FindFileLines(stackLines);
        this.path = this.FindPath(fileLines);
        this.startLineCol = this.FindStartLineAndColumn(fileLines);
        this.lines = this.FindLines();
        this.MarkSuccessLines();
        this.MarkFailureLine();
    }

    private FindStackLines(): string[] {
        let object = JSON.parse(this.test.GetMessage());
        let sLines: string[] = [];
        if(!this.test.IsPassed()) {
            sLines = object["err"]["stackMessage"].split("at ");
        } else {
            if(!object || !object.length || object.length === 0) {
                sLines = null;
            } else {
                sLines = object[0]["paths"];
            }
        }
        return sLines;
    }

    private FindFileLines(stackLines: string[]): string[] {
        let lines: string[] = [];
        if(stackLines === null) {
            lines = null;
        } else {
            let file = path.parse(this.test.GetPath()).base;
            for(let line of stackLines) {
                if(line.indexOf(file) > -1) {
                    lines.push(line);
                }
            }
        }
        return lines;
    }

    private FindPath(fileLines: string[]): string {
        let p = "";
        if(fileLines === null) {
            p = null;
        } else {
            if(fileLines.length < 1) {
                throw new Error(`There is no file line for ${path.parse(this.test.GetPath()).base}!`);
            } else {
                let line = fileLines[0];
                let pathnum = line.substring(line.indexOf("(")+1, line.lastIndexOf(")"));
                let linecolumn = pathnum.match(/(:\d+:\d+)/)[0];
                p = pathnum.substring(0, pathnum.indexOf(linecolumn));
            }
        }
        return p;
    }

    private FindLineNumber(flines: string[]): number {
        let num = 0;
        if(flines === null || flines.length < 1) {
            num = -1;
        } else {
            let line = flines[0];
            let pathnum = line.substring(line.indexOf("(")+1, line.lastIndexOf(")"));
            let linecol = pathnum.match(/(:\d+:\d+)/)[0];
            num = parseInt(linecol.split(":")[1]);
        }
        return num;
    }

    private FindStartLineAndColumn(fileLines: string[]): [number, number] {
        let nums: [number, number] = [-1,-1];
        if(fileLines === null) {
            nums = null;
        } else {
            if(fileLines.length < 2) throw new Error("Test start not found in stack trace!");
            else {
                let line = fileLines[1];
                let linecol = line.match(/:\d+:\d+/)[0];
                let start = parseInt(linecol.split(":")[1]);
                let col = parseInt(linecol.split(":")[2]);
                nums = [start, col];
            }
        }
        return nums;
    }

    private FindLines(): CodeLine[] {
        let codeLines = [];
        if(this.startLineCol === null) {
            codeLines = null;
        } else {
            let content = fs.readFileSync(this.path).toString().split("\n").slice(this.startLineCol[0]-1);
            let p = 0;
            let i = 0;
            let working = true;
            while(working) {
                let line = content[i];
                codeLines.push(new CodeLine(line, this.startLineCol[0]+i));
                for(let j=(i===0 ? this.startLineCol[1]-1 : 0); j<line.length; j++) { // TODO: Should be column!
                    if(line.charAt(j) === "(") p++;
                    else if(line.charAt(j) === ")") {
                        p--;
                        if(p === 0) {
                            working = false;
                            break;
                        }
                    } else {
                        continue;
                    }
                }
                i++;
            }
        }
        return codeLines;
    }

    private MarkSuccessLines(): void {
        if(this.startLineCol === null) {
            return;
        } else {
            let object: any = JSON.parse(this.test.GetMessage());
            let messages: any = null;
            if(this.test.IsPassed()) {
                messages = object;
            } else {
                messages = object["info"];
            }
            for(let message of messages) {
                let plines = message["paths"];
                let flines = this.FindFileLines(plines);
                let number = this.FindLineNumber(flines);
                for(let line of this.lines) {
                    if(line.GetLineNumber() === number) {
                        line.SetState("passed");
                        break;
                    }
                }
            }
        }
    }

    private MarkFailureLine(): void {
        if(!this.test.IsPassed()) {
            let object: any = JSON.parse(this.test.GetMessage());
            let error: any = object["err"];
            let stackLines = error.stackMessage.split("at ");
            let fileLines = this.FindFileLines(stackLines);
            let number = this.FindLineNumber(fileLines);
            for(let line of this.lines) {
                if(line.GetLineNumber() === number) {
                    line.SetState("failed");
                }
            }
        }
    }

    public GetStartLineCol(): [number, number] {
        return this.startLineCol;
    }

    public GetPath(): string {
        return this.path;
    }

    public GetLines(): CodeLine[] {
        return this.lines;
    }

}