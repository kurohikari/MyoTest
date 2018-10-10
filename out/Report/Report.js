"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let report = null;
class Report {
    constructor() {
        this.tests = {};
    }
    AddTest(file, testResult) {
        if (!this.tests[file]) {
            this.tests[file] = [];
        }
        this.tests[file].push(testResult);
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
}
exports.Report = Report;
