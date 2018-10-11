"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
/**
 * Name used for the report file
 */
const reportName = "myo-report.json";
let report = null;
class Report {
    constructor() {
        this.tests = {};
        this.structure = null;
    }
    /**
     * Add a test result to the report
     * @param file file of the test
     * @param testResult the test result to add
     */
    AddTest(file, testResult) {
        if (!this.tests[file]) {
            this.tests[file] = [];
        }
        this.tests[file].push(testResult);
    }
    /**
     * Set the source folder of the tests
     * @param newSource
     */
    SetSource(newSource) {
        this.source = newSource;
    }
    /**
     * Get the source folder of the tests
     */
    GetSource() {
        return this.source;
    }
    /**
     * Set the structure the report
     * @param newStructure structure of the report
     */
    SetStructure(newStructure) {
        this.structure = newStructure;
    }
    /**
     * Get the report structure
     */
    GetStructure() {
        return this.structure;
    }
    /**
     * Set the output folder for the report
     * @param newOutput
     */
    SetOutput(newOutput) {
        this.output = newOutput;
    }
    /**
     * Get the output folder for the project
     */
    GetOutput() {
        return this.output;
    }
    /**
     * Get the singleton instance of the Report
     */
    static GetReport() {
        if (report === null)
            report = new Report();
        return report;
    }
    /**
     * Save the report as a json file
     */
    Save() {
        if (!fs.existsSync(this.output))
            fs.mkdirSync(this.output);
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
