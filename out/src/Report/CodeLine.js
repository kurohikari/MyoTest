"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CodeLine {
    constructor(line, lineNumber) {
        this.line = line;
        this.lineNumber = lineNumber;
        this.state = "neutral";
    }
    SetState(newState) {
        this.state = newState;
    }
    GetState() {
        return this.state;
    }
    GetLine() {
        return this.line;
    }
    GetLineNumber() {
        return this.lineNumber;
    }
    GetClass() {
        if (this.state === "neutral") {
            return "neutral-line";
        }
        else if (this.state === "passed") {
            return "passed-line";
        }
        else if (this.state === "failed") {
            return "failed-line";
        }
        else {
            throw new Error(`Unknown state: ${this.state}`);
        }
    }
}
exports.CodeLine = CodeLine;
