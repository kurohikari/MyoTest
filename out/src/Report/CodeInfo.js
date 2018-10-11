"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class CodeInfo {
    constructor(stackLines, file) {
        this.stackLines = stackLines;
        this.file = file;
        this.RetrieveStackLine();
        this.RetrievePathAndLineNumber();
        this.RetrieveCodeLine();
    }
    RetrieveStackLine() {
        for (let line of this.stackLines) {
            if (line.indexOf(this.file) > -1) {
                this.stackLine = line;
                break;
            }
        }
    }
    RetrievePathAndLineNumber() {
        let pathnum = this.stackLine.substring(this.stackLine.indexOf("(") + 1, this.stackLine.lastIndexOf(")"));
        let linecolumn = pathnum.match(/(:\d+:\d+)/)[0];
        this.path = pathnum.substring(0, pathnum.indexOf(linecolumn));
        this.lineNumber = parseInt(linecolumn.split(":")[1]) - 1;
    }
    RetrieveCodeLine() {
        this.codeLine = fs.readFileSync(this.path).toString().split("\n")[this.lineNumber].trim();
    }
    GetCodeLine() {
        return this.codeLine;
    }
    GetLine() {
        return this.lineNumber;
    }
}
exports.CodeInfo = CodeInfo;
