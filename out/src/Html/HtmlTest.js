"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../Resources/Resources");
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
    GenerateCodeLines() {
        let sample = new TestSample_1.TestSample(this.test);
        let lines = [];
        for (let i = 0; i < sample.GetLines().length; i++) {
            let line = sample.GetLines()[i];
            let lineNumber = sample.StartLine() + i;
            lines.push(this.CodeLineAsHTML(line, sample.GetClass(lineNumber), lineNumber));
        }
        return lines;
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
    CodeLineAsHTML(line, lineClass, lineNumber) {
        return Resources_1.Test.line.replace("{{color}}", lineClass)
            .replace("{{linenumber}}", `${lineNumber}`)
            .replace("{{line}}", line);
    }
    /**
     * Save the testcase source
     * @param htmlPath
     */
    SaveAsHTML(htmlPath) {
        if (this.test.WasFailed()) {
            this.SaveFullHTML(htmlPath);
        }
        else {
            if (this.test.GetSuccessLines().length === 0 && !this.test.WasFailed()) {
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
        let filePath = path.join(htmlPath, `${this.test.GetName()}.html`);
        let toWrite = Resources_1.Test.base.replace("{{filepure}}", this.test.GetName())
            .replace("{{title}}", this.test.GetName())
            .replace("{{path}}", this.test.GetFilePath())
            .replace("{{sidebar}}", SideBar_1.SideBar.GenerateSideBar(filePath))
            .replace("{{code}}", "The testcase did not contain any test...");
        fs.writeFileSync(path.join(htmlPath, `${this.test.GetName()}.html`), toWrite);
    }
    /**
     * Save the test case when it does have tests
     * @param htmlPath
     */
    SaveFullHTML(htmlPath) {
        let filePath = path.join(htmlPath, `${this.test.GetName()}.html`);
        let toWrite = Resources_1.Test.base.replace("{{filepure}}", this.test.GetName())
            .replace("{{title}}", this.test.GetName())
            .replace("{{path}}", this.test.GetFilePath())
            .replace("{{sidebar}}", SideBar_1.SideBar.GenerateSideBar(filePath))
            .replace("{{code}}", this.GenerateCodeLines().join("\n"));
        fs.writeFileSync(path.join(htmlPath, `${this.test.GetName()}.html`), toWrite);
    }
}
exports.HTMLTest = HTMLTest;
