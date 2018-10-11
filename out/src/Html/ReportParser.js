"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Report_1 = require("../Report/Report");
const HtmlReport_1 = require("./HtmlReport");
const Css_1 = require("./Css");
const Js_1 = require("./Js");
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
            fs.writeFileSync(path.join(currentPath, "myo-css.css"), Css_1.Css);
        }
        if (!fs.existsSync(path.join(currentPath, "myo-js.js"))) {
            fs.writeFileSync(path.join(currentPath, "myo-js.js"), Js_1.Js);
        }
        for (let suite of structure.GetTestSuites()) {
            if (suite.HasTests()) {
                let htmlReport = new HtmlReport_1.HTMLReport(suite.GetFileName());
                for (let test of suite.GetTests()) {
                    htmlReport.AddTest(test, suite.GetFileName());
                }
                htmlReport.SaveAsHTML(currentPath);
            }
        }
        for (let sub of structure.GetChildren()) {
            if (!sub.HasTests())
                continue;
            let newPath = path.join(currentPath, sub.GetName());
            this.ParseStructure(sub, newPath);
        }
    }
}
exports.ReportParser = ReportParser;
