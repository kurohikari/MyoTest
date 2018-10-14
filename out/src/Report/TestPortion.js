"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class TestPortion {
    constructor(info) {
        this.RetrieveCodeLines(info);
    }
    /**
     * Find the lines of code from the source where the test code is described
     * @param info
     */
    RetrieveCodeLines(info) {
        let lines = fs.readFileSync(info.GetPath()).toString().split("\n");
        lines = lines.slice(info.GetTestStartLine() - 1);
        let codeLines = [];
        let p = 0;
        let i = 0;
        let working = true;
        while (working) {
            let line = lines[i];
            codeLines.push(line);
            for (let j = (i === 0 ? info.GetTestStartColumn() - 1 : 0); j < line.length; j++) {
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
        this.codeLines = codeLines;
    }
    /**
     * Get the lines of code of the test
     */
    GetCodeLines() {
        return this.codeLines;
    }
}
exports.TestPortion = TestPortion;
