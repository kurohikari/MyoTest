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

    /**
     * Find the specific stack line corresponding to the test that succeeded
     */
    private RetrieveStackLine() {
        for(let line of this.stackLines) {
            if(line.indexOf(this.file) > -1) {
                this.stackLine = line;
                break;
            }
        }
    }

    /**
     * Find the path and line number of the code for the test that succeeded form the stack line
     */
    private RetrievePathAndLineNumber() {
        let pathnum = this.stackLine.substring(this.stackLine.indexOf("(")+1, this.stackLine.lastIndexOf(")"));
        let linecolumn = pathnum.match(/(:\d+:\d+)/)[0];
        this.path = pathnum.substring(0, pathnum.indexOf(linecolumn));
        this.lineNumber = parseInt(linecolumn.split(":")[1])-1;
    }

    /**
     * Find the line of the code containing the test statement in the file of the test
     */
    private RetrieveCodeLine() {
        this.codeLine = fs.readFileSync(this.path).toString().split("\n")[this.lineNumber].trim();
    }

    /**
     * Get the stakline corresponding to the successful test
     */
    public GetStackLine() {
        return this.stackLine;
    }

    /**
     * Get the line of code with the test that succeeded
     */
    public GetCodeLine() {
        return this.codeLine;
    }

    /**
     * Get the line number in the code of the line containing the test
     */
    public GetLine() {
        return this.lineNumber;
    }

    /**
     * The the file name of the file containing the test
     */
    public GetFile() {
        return this.file;
    }

}