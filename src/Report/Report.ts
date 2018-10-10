import { TestResult } from "./TestResult";
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

}