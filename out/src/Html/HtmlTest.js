"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../Resources/Resources");
const TestSample_1 = require("../Report/TestSample");
const Report_1 = require("../Report/Report");
const SideBar_1 = require("./SideBar");
const path = require("path");
const fs = require("fs");
class HTMLTest {
    constructor(test) {
        this.test = test;
        this.path = test.GetFilePath();
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
     * Returns an html string describing the path to the suite with links to prior directories
     */
    GetPathWithLinks() {
        let base = path.parse(Report_1.Report.GetReport().GetSource()).base;
        this.path = this.path.replace(Report_1.Report.GetReport().GetSource(), base);
        let items = this.path.split(path.sep);
        let links = [];
        for (let i = 0; i < items.length; i++) {
            let item = items[items.length - 1 - i];
            if (i === 0) {
                links.unshift(Resources_1.RSuite.titleLink.replace("{{pathtofile}}", "#")
                    .replace("{{item}}", item));
            }
            else {
                let pathToFile = "..";
                for (let j = 0; j < i - 1; j++) {
                    pathToFile = path.join(pathToFile, "..");
                }
                pathToFile = path.join(pathToFile, `dir_${item}.html`);
                links.unshift(Resources_1.RSuite.titleLink.replace("{{pathtofile}}", pathToFile)
                    .replace("{{item}}", item));
            }
        }
        return links.join(path.sep);
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
            .replace("{{path}}", this.GetPathWithLinks())
            .replace("{{sidebar}}", SideBar_1.SideBar.GenerateSideBar(filePath))
            .replace("{{code}}", this.GenerateCodeLines().join("\n"));
        fs.writeFileSync(path.join(htmlPath, `${this.test.GetName()}.html`), toWrite);
    }
}
exports.HTMLTest = HTMLTest;
