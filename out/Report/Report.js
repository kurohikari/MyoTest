"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let report = null;
class Report {
    constructor() {
    }
    static GetReport() {
        if (report === null)
            report = new Report();
        return report;
    }
    AddTestCase(testCase) {
        this.testCases.push(testCase);
    }
}
exports.Report = Report;
