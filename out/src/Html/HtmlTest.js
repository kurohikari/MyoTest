"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../Resources/Resources");
const CodeInfo_1 = require("../Report/CodeInfo");
const SideBar_1 = require("./SideBar");
const path = require("path");
const fs = require("fs");
const TestSample_1 = require("../Report/TestSample");
class HTMLTest {
    constructor(test) {
        this.test = test;
    }
    /**
     * Generates the lines of code of the test case
     * @param info
     */
    GenerateCodeLines(info) {
        let sample = new TestSample_1.TestSample(this.test);
        let lines = [];
        for (let line of sample.GetLines()) {
            lines.push(this.CodeLineAsHTML(line));
        }
        return lines;
        /*let portion = new TestPortion(info);
        let lines = [];
        let codeLines = portion.GetCodeLines();
        for(let i=0; i<codeLines.length; i++) {
            let codeLine = codeLines[i];
            lines.push(this.GenerateCodeLine(codeLine, i+info.GetTestStartLine()));
        }
        return lines;*/
    }
    /**
     * Generates one line of code for the test case
     * @param line
     * @param num
     */
    GenerateCodeLine(line, num) {
        return Resources_1.Test.line.replace("{{linenumber}}", `${num}`)
            .replace("{{line}}", line);
    }
    CodeLineAsHTML(line) {
        return Resources_1.Test.line.replace("{{color}}", line.GetClass())
            .replace("{{linenumber}}", `${line.GetLineNumber()}`)
            .replace("{{line}}", line.GetLine());
    }
    /**
     * Save the testcase source
     * @param htmlPath
     */
    SaveAsHTML(htmlPath) {
        if (!this.test.IsPassed()) {
            this.SaveFullHTML(htmlPath);
        }
        else {
            let object = JSON.parse(this.test.GetMessage());
            if (!object || !object.length || object.length === 0) {
                this.SaveEmptyHTML(htmlPath);
            }
            else {
                this.SaveFullHTML(htmlPath);
            }
        }
    }
    /**
     * Save the test case when it does not contain any test
     * @param htmlPath
     */
    SaveEmptyHTML(htmlPath) {
        let filePath = path.join(htmlPath, `${this.test.GetTestName()}.html`);
        let toWrite = Resources_1.Test.base.replace("{{filepure}}", this.test.GetTestName())
            .replace("{{title}}", this.test.GetTestName())
            .replace("{{path}}", this.test.GetPath())
            .replace("{{sidebar}}", SideBar_1.SideBar.GenerateSideBar(filePath))
            .replace("{{code}}", "The testcase did not contain any test...");
        fs.writeFileSync(path.join(htmlPath, `${this.test.GetTestName()}.html`), toWrite);
    }
    /**
     * Save the test case when it does have tests
     * @param htmlPath
     */
    SaveFullHTML(htmlPath) {
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
