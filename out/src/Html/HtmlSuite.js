"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestSample_1 = require("../Report/TestSample");
const Resources_1 = require("../Resources/Resources");
const SideBar_1 = require("./SideBar");
const path = require("path");
const fs = require("fs");
const Report_1 = require("../Report/Report");
class HTMLSuite {
    constructor(suite) {
        this.suite = suite;
        if (suite.TestCases().length > 0)
            this.path = suite.GetPath();
    }
    /**
     * Generates the tests to be included in the report
     */
    GenerateTests() {
        let toReturn = [];
        for (let test of this.suite.TestCases()) {
            toReturn.push(this.GenerateTest(test));
        }
        return toReturn;
    }
    /**
     * Generate an html test using the given test
     * @param test
     */
    GenerateTest(test) {
        return ((!test.WasFailed()) ? this.GenerateOKTest(test) : this.GenerateKOTest(test));
    }
    /**
     * Generate an OK test report using the test passed
     * @param test
     */
    GenerateOKTest(test) {
        let codeLines = this.GenerateOKLines(test);
        return Resources_1.RSuite.okTest.replace("{{testname}}", test.GetName())
            .replace("{{testlink}}", path.join(".", "testcases", `${path.parse(test.GetName()).name}.html`))
            .replace("{{info}}", codeLines.join("\n"));
    }
    /**
     * Generates a list of html ok lines using the given test
     * @param messages
     */
    GenerateOKLines(test) {
        let toReturn = [];
        let testSample = new TestSample_1.TestSample(test);
        for (let num of test.GetSuccessLines()) {
            toReturn.push(this.GenerateOKLine(testSample, num));
        }
        return toReturn;
    }
    /**
     * Generates an html ok line using the given info
     * @param info
     */
    GenerateOKLine(testSample, lineNumber) {
        return Resources_1.RSuite.okLine.replace("{{codeline}}", testSample.GetLineAt(lineNumber))
            .replace("{{linenumber}}", `${lineNumber}`);
    }
    /**
     * Generate a KO test report using the test passed
     * @param test
     */
    GenerateKOTest(test) {
        let codeLines = this.GenerateKOLines(test);
        return Resources_1.RSuite.koTest.replace("{{name}}", test.GetName())
            .replace("{{testlink}}", path.join(".", "testcases", `${path.parse(test.GetName()).name}.html`))
            .replace("{{lines}}", codeLines.join("\n"))
            .replace("{{error}", test.GetTrace());
    }
    /**
     * Generates a list of html ko lines using the given list of messages
     * @param messages
     */
    GenerateKOLines(test) {
        let sample = new TestSample_1.TestSample(test);
        let toReturn = [];
        for (let num of test.GetSuccessLines()) {
            toReturn.push(this.GenerateKOLine(sample.GetLineAt(num), num));
        }
        return toReturn;
    }
    /**
     * Generates an html ko line using the given info
     * @param info
     */
    GenerateKOLine(line, lineNumber) {
        return Resources_1.RSuite.koLine.replace("{{codeline}}", line)
            .replace("{{linenumber}}", `${lineNumber}`);
    }
    /**
     * Returns an html string describing the path to the suite with links to prior directories
     */
    GetPathWithLinks() {
        this.path = path.relative(Report_1.Report.GetReport().GetSource(), this.path);
        let items = this.path.split(path.sep);
        let links = [];
        for (let i = 0; i < items.length; i++) {
            let item = items[items.length - 1 - i];
            if (i === 0) {
                links.unshift(Resources_1.RSuite.titleLink.replace("{{pathtofile}}", "#")
                    .replace("{{item}}", item));
            }
            else {
                let pathToFile = "";
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
     * Generates the analysis part of the html
     */
    GenerateAnalysis() {
        let numPasses = this.suite.PassCount();
        let numFails = this.suite.FailCount();
        let tot = numPasses + numFails;
        if (numFails === 0 && numPasses === 0)
            return '<div class="analysis">No test was run!</div>';
        else {
            let percentage = (numPasses * 100 / tot).toFixed(2);
            let passes = (numPasses === 1) ? "1 test passed!" : `${numPasses} tests passed!`;
            let fails = (numFails === 1) ? "1 test failed!" : `${numFails} tests failed!`;
            return Resources_1.RSuite.analysis.replace("{{percentage}}", percentage)
                .replace("{{passes}}", passes)
                .replace("{{fails}}", fails);
        }
    }
    /**
     * Parse and save the report as an html at the given path
     * @param htmlPath path where to save report
     */
    SaveAsHTML(htmlPath) {
        // console.log("HTMLPath: " + htmlPath);
        let file = this.suite.GetFile();
        let purename = file.substring(0, file.indexOf(path.parse(file).ext));
        let name = `${purename}.html`;
        let filePath = path.join(htmlPath, name);
        let links = this.GetPathWithLinks();
        let analysis = this.GenerateAnalysis();
        let sidebar = SideBar_1.SideBar.GenerateSideBar(filePath);
        let tests = this.GenerateTests();
        let toWrite = Resources_1.RSuite.base.replace("{{filepure}}", purename)
            .replace("{{title}}", this.suite.GetFile())
            .replace("{{sidebar}}", sidebar)
            .replace("{{path}}", links)
            .replace("{{analysis}}", analysis)
            .replace("{{tests}}", tests.join("\n"));
        fs.writeFileSync(filePath, toWrite);
    }
}
exports.HTMLSuite = HTMLSuite;
