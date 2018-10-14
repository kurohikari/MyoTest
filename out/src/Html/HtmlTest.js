"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../Resources/Resources");
const path = require("path");
const fs = require("fs");
const CodeInfo_1 = require("../Report/CodeInfo");
const TestPortion_1 = require("../Report/TestPortion");
const SideBar_1 = require("./SideBar");
class HTMLTest {
    constructor(test) {
        this.test = test;
    }
    GenerateCodeLines(info) {
        let portion = new TestPortion_1.TestPortion(info);
        let lines = [];
        let codeLines = portion.GetCodeLines();
        for (let i = 0; i < codeLines.length; i++) {
            let codeLine = codeLines[i];
            lines.push(this.GenerateCodeLine(codeLine, i + info.GetTestStartLine()));
        }
        return lines;
    }
    GenerateCodeLine(line, num) {
        return Resources_1.Test.line.replace("{{linenumber}}", `${num}`)
            .replace("{{line}}", line);
    }
    SaveAsHTML(htmlPath) {
        let object = JSON.parse(this.test.GetMessage());
        let info = this.test.IsPassed() ? new CodeInfo_1.CodeInfo(object[0]["paths"], path.parse(this.test.GetPath()).base) : new CodeInfo_1.CodeInfo(object["err"]["stackMessage"].split("\n"), path.parse(this.test.GetPath()).base);
        let filePath = path.join(htmlPath, `${this.test.GetTestName()}.html`);
        let toWrite = Resources_1.Test.base.replace("{{filepure}}", this.test.GetTestName())
            .replace("{{title}}", this.test.GetTestName())
            .replace("{{path}}", this.test.GetPath())
            .replace("{{sidebar}}", SideBar_1.SideBar.GenerateSideBar(filePath))
            .replace("{{code}}", this.GenerateCodeLines(info).join("\n"));
        fs.writeFileSync(path.join(htmlPath, `${this.test.GetTestName()}.html`), toWrite);
    }
}
exports.HTMLTest = HTMLTest;
