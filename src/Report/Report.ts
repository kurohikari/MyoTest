import { TestResult } from "./TestResult";
import * as path from "path";
import * as fs from "fs";
import { Test } from "../Test/Test";
import { DirStructure } from "./DirStructure";

const reportName: string = "myo-report.json";
let report: Report = null;

export class Report {

    private source: string;
    private output: string;
    private structure: DirStructure;
    private tests: {[file: string]: TestResult[]};

    private constructor() {
        this.tests = {};
        this.structure = null;
    }

    public AddTest(file: string, testResult: TestResult) {
        if(!this.tests[file]) {
            this.tests[file] = [];
        }
        this.tests[file].push(testResult);
    }

    public SetSource(newSource: string) {
        this.source = newSource;
    }

    public GetSource() {
        return this.source;
    }

    public SetStructure(newStructure: DirStructure) {
        this.structure = newStructure;
    }

    public GetStructure() {
        return this.structure;
    }

    public SetOutput(newOutput: string) {
        this.output = newOutput;
    }

    public GetOutput() {
        return this.output;
    }

    public static GetReport() {
        if(report === null) report = new Report();
        return report;
    }

    public GetTests() {
        return this.tests;
    }

    public Save() {
        let stream = fs.createWriteStream(path.join(this.output, reportName));
        stream.write(JSON.stringify(this.tests), (error) => {
            if(error) {
                console.error("Error saving report!");
                console.error(error);
            } else stream.close();
        });
    }

}

Test("Test reports", (test) => {
    let report1 = Report.GetReport();
    let report2 = Report.GetReport();
    test.DeepStrictEquals(report1, report2);
});