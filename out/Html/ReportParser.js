"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Report_1 = require("../Report/Report");
const HtmlReport_1 = require("./HtmlReport");
class ReportParser {
    constructor(report) {
        this.report = report;
    }
    static ParseReport() {
        (new ReportParser(Report_1.Report.GetReport())).Parse();
    }
    Parse() {
        let tests = this.report.GetTests();
        for (let file of Object.keys(tests)) {
            let results = tests[file];
            let html = new HtmlReport_1.HTMLReport(file);
            for (let result of results) {
                html.AddTest(result);
            }
            html.SaveAsHTML();
        }
    }
}
exports.ReportParser = ReportParser;
