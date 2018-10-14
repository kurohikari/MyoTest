"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class CodeInfo {
    constructor(stackLines, file) {
        this.stackLines = stackLines;
        this.file = file;
        this.RetrieveFileLines();
        this.RetrieveStackLine();
        this.RetrievePathAndLineNumber();
        this.RetrieveCodeLine();
        this.RetrieveTestStart();
    }
    /**
     * Finds the lines in the stack trace containing the file with the test
     */
    RetrieveFileLines() {
        this.fileLines = [];
        for (let line of this.stackLines) {
            if (line.indexOf(this.file) > -1) {
                this.fileLines.push(line);
            }
        }
    }
    /**
     * Finds the start of the test from the stacklines
     */
    RetrieveTestStart() {
        if (this.fileLines.length < 2)
            throw new Error("Test start not found in stack trace!");
        else {
            let line = this.fileLines[1];
            let linecol = line.match(/:\d+:\d+/)[0];
            this.testStartLine = parseInt(linecol.split(":")[1]);
            this.testStartColumn = parseInt(linecol.split(":")[2]);
        }
    }
    /**
     * Find the specific stack line corresponding to the test that succeeded
     */
    RetrieveStackLine() {
        if (this.fileLines.length > 0) {
            this.stackLine = this.fileLines[0];
        }
        else {
            throw new Error(`The stack trace does not contain the file: ${this.file}`);
        }
    }
    /**
     * Find the path and line number of the code for the test that succeeded form the stack line
     */
    RetrievePathAndLineNumber() {
        let pathnum = this.stackLine.substring(this.stackLine.indexOf("(") + 1, this.stackLine.lastIndexOf(")"));
        let linecolumn = pathnum.match(/(:\d+:\d+)/)[0];
        this.path = pathnum.substring(0, pathnum.indexOf(linecolumn));
        this.lineNumber = parseInt(linecolumn.split(":")[1]) - 1;
    }
    /**
     * Find the line of the code containing the test statement in the file of the test
     */
    RetrieveCodeLine() {
        this.codeLine = fs.readFileSync(this.path).toString().split("\n")[this.lineNumber].trim();
    }
    /**
     * Get the stakline corresponding to the successful test
     */
    GetStackLine() {
        return this.stackLine;
    }
    /**
     * Get the line of code with the test that succeeded
     */
    GetCodeLine() {
        return this.codeLine;
    }
    /**
     * Get the line number in the code of the line containing the test
     */
    GetLine() {
        return this.lineNumber;
    }
    /**
     * The the file name of the file containing the test
     */
    GetFile() {
        return this.file;
    }
    /**
     * Get the path of the file containing the test
     */
    GetPath() {
        return this.path;
    }
    /**
     * Get the lines in the stack trace containing the file
     */
    GetFileLines() {
        return this.fileLines;
    }
    /**
     * Get the line where the test starts according to the stack trace
     */
    GetTestStartLine() {
        return this.testStartLine;
    }
    /**
     * Get the column where the test starts according to the stack trace
     */
    GetTestStartColumn() {
        return this.testStartColumn;
    }
}
exports.CodeInfo = CodeInfo;
