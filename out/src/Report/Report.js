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
        this.structure = null;
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
        this.structure.Clean();
        if (!fs.existsSync(this.output))
            fs.mkdirSync(this.output);
        let stream = fs.createWriteStream(path.join(this.output, reportName));
        stream.write(JSON.stringify(this.structure), (error) => {
            if (error) {
                console.error("Error saving report!");
                console.error(error);
            }
            else
                stream.close();
        });
    }
    Verbose(structure = this.structure) {
        console.log(structure.GetName());
        let suites = structure.GetTestSuites();
        for (let suite of suites) {
            console.log("=== " + suite.GetFileName() + " ===");
            let tests = suite.GetTests();
            for (let test of tests) {
                let ifPassMsg = test.IsPassed() ? "OK" : "KO";
                console.log("\t--- " + test.GetTestName() + ": " + ifPassMsg);
            }
        }
        let children = structure.GetChildren();
        for (let child of children) {
            this.Verbose(child);
        }
    }
}
exports.Report = Report;
