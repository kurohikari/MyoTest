"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CodeLine_1 = require("./CodeLine");
const path = require("path");
const fs = require("fs");
class TestSample {
    constructor(test) {
        this.test = test;
        let stackLines = this.FindStackLines();
        let fileLines = this.FindFileLines(stackLines);
        this.path = this.FindPath(fileLines);
        this.startLine = this.FindStartLine(fileLines);
        if (this.startLine === -1) {
            console.log(test.GetPath());
        }
        this.lines = this.FindLines();
        this.MarkSuccessLines();
        this.MarkFailureLine();
    }
    FindStackLines() {
        let object = JSON.parse(this.test.GetMessage());
        let sLines = [];
        if (!this.test.IsPassed()) {
            sLines = object["err"]["stackMessage"].split("at ");
        }
        else {
            if (!object || !object.length || object.length === 0) {
                sLines = null;
            }
            else {
                sLines = object[0]["paths"];
            }
        }
        return sLines;
    }
    FindFileLines(stackLines) {
        let lines = [];
        if (stackLines === null) {
            lines = null;
        }
        else {
            let file = path.parse(this.test.GetPath()).base;
            for (let line of stackLines) {
                if (line.indexOf(file) > -1) {
                    lines.push(line);
                }
            }
        }
        return lines;
    }
    FindPath(fileLines) {
        let p = "";
        if (fileLines === null) {
            p = null;
        }
        else {
            if (fileLines.length < 1) {
                throw new Error(`There is no file line for ${path.parse(this.test.GetPath()).base}!`);
            }
            else {
                let line = fileLines[0];
                let pathnum = line.substring(line.indexOf("(") + 1, line.lastIndexOf(")"));
                let linecolumn = pathnum.match(/(:\d+:\d+)/)[0];
                p = pathnum.substring(0, pathnum.indexOf(linecolumn));
            }
        }
        return p;
    }
    FindLineNumber(flines) {
        let num = 0;
        if (flines === null || flines.length < 1) {
            num = -1;
        }
        else {
            let line = flines[0];
            let pathnum = line.substring(line.indexOf("(") + 1, line.lastIndexOf(")"));
            let linecol = pathnum.match(/(:\d+:\d+)/)[0];
            num = parseInt(linecol.split(":")[1]);
        }
        return num;
    }
    FindStartLine(fileLines) {
        let num = 0;
        if (fileLines === null) {
            num = -1;
        }
        else {
            if (fileLines.length < 2)
                throw new Error("Test start not found in stack trace!");
            else {
                let line = fileLines[1];
                let linecol = line.match(/:\d+:\d+/)[0];
                num = parseInt(linecol.split(":")[1]);
            }
        }
        return num;
    }
    FindLines() {
        let codeLines = [];
        if (this.startLine === -1) {
            codeLines = null;
        }
        else {
            let content = fs.readFileSync(this.path).toString().split("\n").slice(this.startLine - 1);
            let p = 0;
            let i = 0;
            let working = true;
            while (working) {
                let line = content[i];
                codeLines.push(new CodeLine_1.CodeLine(line, this.startLine + i));
                for (let j = (i === 0 ? this.startLine - 1 : 0); j < line.length; j++) {
                    if (line.charAt(j) === "(")
                        p++;
                    else if (line.charAt(j) === ")") {
                        p--;
                        if (p === 0) {
                            working = false;
                            break;
                        }
                    }
                    else {
                        continue;
                    }
                }
                i++;
            }
        }
        return codeLines;
    }
    MarkSuccessLines() {
        if (this.startLine === -1) {
            return;
        }
        else {
            let object = JSON.parse(this.test.GetMessage());
            let messages = null;
            if (this.test.IsPassed()) {
                messages = object;
            }
            else {
                messages = object["info"];
            }
            for (let message of messages) {
                let plines = message["paths"];
                let flines = this.FindFileLines(plines);
                let number = this.FindLineNumber(flines);
                for (let line of this.lines) {
                    if (line.GetLineNumber() === number) {
                        line.SetState("passed");
                        break;
                    }
                }
            }
        }
    }
    MarkFailureLine() {
        if (!this.test.IsPassed()) {
            let object = JSON.parse(this.test.GetMessage());
            let error = object["err"];
            let stackLines = error.stackMessage.split("at ");
            let fileLines = this.FindFileLines(stackLines);
            let number = this.FindLineNumber(fileLines);
            for (let line of this.lines) {
                if (line.GetLineNumber() === number) {
                    line.SetState("failed");
                }
            }
        }
    }
    GetStartLine() {
        return this.startLine;
    }
    GetPath() {
        return this.path;
    }
    GetLines() {
        return this.lines;
    }
}
exports.TestSample = TestSample;
