import { TestCase } from "../Test/TestCase";
import * as fs from "fs";

export class TestSample {

    private lines: string[];

    constructor(private testCase: TestCase) {
        this.lines = [];
        let content = fs.readFileSync(testCase.GetFilePath()).toString().split("\n");
        let lines = content.slice(testCase.GetStartLine() - 1);
        let par = 0;
        let done = false;
        for(let i = 0; i<lines.length; i++) {
            let line = lines[i];
            this.lines.push(line);
            for(let j = (i === 0 ? testCase.GetStartColumn() : 0); j<line.length; j++) {
                let char = line.charAt(j);
                if(char === "(") {
                    par++;
                } else if(char === ")") {
                    par--;
                    if(par === 0) {
                        done = true;
                        break;
                    }
                }
            }
            if(done) {
                break;
            }
        }
    }

    public GetLineAt(lineNumber: number): string {
        let lineNum = lineNumber - this.testCase.GetStartLine();
        if(lineNum < 0 || lineNum >= this.lines.length) return `Line ${lineNum} is not in the test!`;
        else return this.lines[lineNum];
    }

    public GetLines(): string[] {
        return this.lines;
    }

    public StartLine() {
        return this.testCase.GetStartLine();
    }

    public GetClass(lineNumber: number): string {
        if(this.testCase.GetSuccessLines().indexOf(lineNumber) >= 0) {
            return "passed-line";
        } else if(this.testCase.GetErrorLine() === lineNumber) {
            return "failed-line";
        } else {
            return "neutral-line";
        }
    }

}