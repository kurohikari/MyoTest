"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CodeInfo_1 = require("../Report/CodeInfo");
const Resources_1 = require("../Resources/Resources");
const SideBar_1 = require("./SideBar");
const path = require("path");
const fs = require("fs");
class HTMLSuite {
    constructor(suite) {
        this.suite = suite;
        if (suite.HasTests())
            this.path = suite.GetTests()[0].GetPath();
    }
    /**
     * Generates the tests to be included in the report
     */
    GenerateTests() {
        let toReturn = [];
        for (let test of this.suite.GetTests()) {
            toReturn.push(this.GenerateTest(test));
        }
        return toReturn;
    }
    /**
     * Generate an html test using the given test
     * @param test
     */
    GenerateTest(test) {
        return (test.IsPassed() ? this.GenerateOKTest(test) : this.GenerateKOTest(test));
    }
    /**
     * Generate an OK test report using the test passed
     * @param test
     */
    GenerateOKTest(test) {
        let codeLines = this.GenerateOKLines(test);
        return Resources_1.Suite.okTest.replace("{{testname}}", test.GetTestName())
            .replace("{{info}}", codeLines.join("\n"));
    }
    /**
     * Generates a list of html ok lines using the given test
     * @param messages
     */
    GenerateOKLines(test) {
        let toReturn = [];
        let messages = JSON.parse(test.GetMessage());
        for (let message of messages) {
            let info = new CodeInfo_1.CodeInfo(message["paths"], this.suite.GetFileName());
            toReturn.push(this.GenerateOKLine(info));
        }
        return toReturn;
    }
    /**
     * Generates an html ok line using the given info
     * @param info
     */
    GenerateOKLine(info) {
        return Resources_1.Suite.okLine.replace("{{codeline}}", info.GetCodeLine())
            .replace("{{linenumber}}", `${info.GetLine()}`);
    }
    /**
     * Generate a KO test report using the test passed
     * @param test
     */
    GenerateKOTest(test) {
        let object = JSON.parse(test.GetMessage());
        let messages = object["info"];
        let error = object["err"];
        let codeLines = this.GenerateKOLines(messages);
        return Resources_1.Suite.koTest.replace("{{name}}", test.GetTestName())
            .replace("{{lines}}", codeLines.join("\n"))
            .replace("{{error}", error.stackMessage);
    }
    /**
     * Generates a list of html ko lines using the given list of messages
     * @param messages
     */
    GenerateKOLines(messages) {
        let toReturn = [];
        for (let message of messages) {
            let info = new CodeInfo_1.CodeInfo(message["paths"], this.suite.GetFileName());
            toReturn.push(this.GenerateKOLine(info));
        }
        return toReturn;
    }
    /**
     * Generates an html ko line using the given info
     * @param info
     */
    GenerateKOLine(info) {
        return Resources_1.Suite.koLine.replace("{{codeline}}", info.GetCodeLine())
            .replace("{{linenumber}}", `${info.GetLine()}`);
    }
    /**
     * Returns an html string describing the path to the suite with links to prior directories
     */
    GetPathWithLinks() {
        let items = this.path.split(path.sep);
        let links = [];
        for (let i = 0; i < items.length; i++) {
            let item = items[items.length - 1 - i];
            if (i === 0) {
                links.unshift(`<a href="#">${item}</a>`);
            }
            else {
                let pathToFile = "";
                for (let j = 0; j < i - 1; j++) {
                    pathToFile = path.join(pathToFile, "..");
                }
                pathToFile = path.join(pathToFile, `dir_${item}.html`);
                links.unshift(`<a href="${pathToFile}">${item}</a>`);
            }
        }
        return links.join(path.sep);
    }
    /**
     * Generates the analysis part of the html
     */
    GenerateAnalysis() {
        let numPasses = this.suite.GetPassCount();
        let numFails = this.suite.GetFailCount();
        let tot = numPasses + numFails;
        if (numFails === 0 && numPasses === 0)
            return "No test was run!";
        else {
            let percentage = (numPasses * 100 / tot).toFixed(2);
            let passes = (numPasses === 1) ? "1 test passed!" : `${numPasses} tests passed!`;
            let fails = (numFails === 1) ? "1 test failed!" : `${numFails} tests failed!`;
            return `${percentage}%<div class="tests-passed" onclick="ShowSuccesses()">${passes}</div><div class="tests-failed" onclick="ShowFailures()">${fails}</div>`;
        }
    }
    /**
     * Parse and save the report as an html at the given path
     * @param htmlPath path where to save report
     */
    SaveAsHTML(htmlPath) {
        let file = this.suite.GetFileName();
        let purename = file.substring(0, file.indexOf(path.parse(file).ext));
        let name = `${purename}.html`;
        let filePath = path.join(htmlPath, name);
        let links = this.GetPathWithLinks();
        let analysis = this.GenerateAnalysis();
        let sidebar = SideBar_1.SideBar.GenerateSideBar(filePath);
        let tests = this.GenerateTests();
        let toWrite = Resources_1.Suite.base.replace("{{filepure}}", purename)
            .replace("{{title}}", this.suite.GetFileName())
            .replace("{{sidebar}}", sidebar)
            .replace("{{path}}", links)
            .replace("{{analysis}}", analysis)
            .replace("{{tests}}", tests.join("\n"));
        fs.writeFileSync(filePath, toWrite);
    }
}
exports.HTMLSuite = HTMLSuite;
