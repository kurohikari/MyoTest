"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const reportName = "myo-report.json";
let report = null;
class Report {
    constructor() {
        this.tests = {};
        this.structure = null;
    }
    AddTest(file, testResult) {
        if (!this.tests[file]) {
            this.tests[file] = [];
        }
        this.tests[file].push(testResult);
    }
    SetSource(newSource) {
        this.source = newSource;
    }
    GetSource() {
        return this.source;
    }
    SetStructure(newStructure) {
        this.structure = newStructure;
    }
    GetStructure() {
        return this.structure;
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
    GetTests() {
        return this.tests;
    }
    Save() {
        let stream = fs.createWriteStream(path.join(this.output, reportName));
        stream.write(JSON.stringify(this.tests), (error) => {
            if (error) {
                console.error("Error saving report!");
                console.error(error);
            }
            else
                stream.close();
        });
    }
}
exports.Report = Report;
