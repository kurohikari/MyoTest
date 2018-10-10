import { TestResult } from "../Report/TestResult";

export class HTMLReport {

    private title: string;

    private tests: string[];
    private testResults: TestResult[];

    constructor(file: string) {
        this.title = `<div>${file}</div>`;
        this.tests = [];
    }

    public GetTitle() {
        return this.title;
    }

    public AddTest(test: TestResult) {
        if(test.IsPassed()) {
            this.tests.push(`<div><div>${test.GetTestName()}</div><div>${test.GetMessage()}</div></div>`);
        } else {
            let error = <Error> JSON.parse(test.GetMessage());
            this.tests.push(`<div><div><div>${test.GetTestName()}</div><div>${error.message}</div></div><div>${error.stack}</div></div>`);
        }
        this.testResults.push(test);
    }

}