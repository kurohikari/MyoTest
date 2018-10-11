import * as fs from "fs";

export class CodeInfo {

    private stackLine: string;
    private path: string;
    private codeLine: string;
    private lineNumber: number;

    constructor(private stackLines: string[], private file: string) {
        this.RetrieveStackLine();
        this.RetrievePathAndLineNumber();
        this.RetrieveCodeLine();
    }

    private RetrieveStackLine() {
        for(let line of this.stackLines) {
            if(line.indexOf(this.file) > -1) {
                this.stackLine = line;
                break;
            }
        }
    }

    private RetrievePathAndLineNumber() {
        let pathnum = this.stackLine.substring(this.stackLine.indexOf("(")+1, this.stackLine.lastIndexOf(")"));
        let linecolumn = pathnum.match(/(:\d+:\d+)/)[0];
        this.path = pathnum.substring(0, pathnum.indexOf(linecolumn));
        this.lineNumber = parseInt(linecolumn.split(":")[1])-1;
    }

    private RetrieveCodeLine() {
        this.codeLine = fs.readFileSync(this.path).toString().split("\n")[this.lineNumber].trim();
    }

    public GetCodeLine() {
        return this.codeLine;
    }

    public GetLine() {
        return this.lineNumber;
    }

}