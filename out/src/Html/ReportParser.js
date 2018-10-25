"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../Resources/Resources");
const HtmlDirectory_1 = require("./HtmlDirectory");
const Report_1 = require("../Report/Report");
const HtmlSuite_1 = require("./HtmlSuite");
const HtmlTest_1 = require("./HtmlTest");
const path = require("path");
const fs = require("fs");
class ReportParser {
    constructor(report) {
        this.report = report;
    }
    static ParseReport() {
        (new ReportParser(Report_1.Report.GetReport())).Parse();
    }
    /**
     * Parse the current report
     */
    Parse() {
        let structure = this.report.GetStructure();
        let output = this.report.GetOutput();
        this.ParseStructure(structure, output);
    }
    /**
     * Parse the structure and its children into the report folder recursively
     * @param structure structure to follow
     * @param currentPath path where to output report
     */
    ParseStructure(structure, currentPath) {
        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath);
        }
        if (!fs.existsSync(path.join(currentPath, "myo-css.jss"))) {
            fs.writeFileSync(path.join(currentPath, "myo-css.css"), Resources_1.Css);
        }
        if (!fs.existsSync(path.join(currentPath, "myo-js.js"))) {
            fs.writeFileSync(path.join(currentPath, "myo-js.js"), Resources_1.Js);
        }
        let casesPath = path.join(currentPath, "testcases");
        fs.mkdirSync(casesPath);
        if (!fs.existsSync(path.join(casesPath, "myo-css.jss"))) {
            fs.writeFileSync(path.join(casesPath, "myo-css.css"), Resources_1.Css);
        }
        if (!fs.existsSync(path.join(casesPath, "myo-js.js"))) {
            fs.writeFileSync(path.join(casesPath, "myo-js.js"), Resources_1.Js);
        }
        for (let suite of structure.GetTestSuites()) {
            if (suite.TestCases().length > 0) {
                let htmlSuite = new HtmlSuite_1.HTMLSuite(suite);
                htmlSuite.SaveAsHTML(currentPath);
                for (let test of suite.TestCases()) {
                    let htmlTest = new HtmlTest_1.HTMLTest(test);
                    htmlTest.SaveAsHTML(casesPath);
                }
            }
        }
        (new HtmlDirectory_1.HtmlDirectory(structure)).SaveAsHTML(currentPath);
        for (let sub of structure.GetChildren()) {
            if (!sub.HasTests())
                continue;
            let newPath = path.join(currentPath, sub.GetName());
            this.ParseStructure(sub, newPath);
        }
    }
}
exports.ReportParser = ReportParser;
