import { TestResult } from "./TestResult";
import * as path from "path";
import * as fs from "fs";

const reportName: string = "myo-report.json";
let report: Report = null;

export class Report {

    private output: string;
    private tests: {[file: string]: TestResult[]};

    private constructor() {
        this.tests = {};
    }

    public AddTest(file: string, testResult: TestResult) {
        if(!this.tests[file]) {
            this.tests[file] = [];
        }
        this.tests[file].push(testResult);
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