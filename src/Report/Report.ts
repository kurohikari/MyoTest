import { TestCase } from "../Test/Test";

let report: Report = null;

export class Report {

    private testCases: TestCase[];

    private constructor() {

    }

    public static GetReport() {
        if(report === null) report = new Report();
        return report;
    }

    public AddTestCase(testCase: TestCase) {
        this.testCases.push(testCase);
    }

}