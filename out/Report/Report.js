"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let report = null;
class Report {
    constructor() {
    }
    SetOutput(newOutput) {
        this.output = newOutput;
    }
    GetOutput() {
        return this.output;
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
