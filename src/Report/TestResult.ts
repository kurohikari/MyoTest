export class TestResult {

    constructor(private testName: string, private message: string, private passed: boolean) {

    }

    public GetTestName() {
        return this.testName;
    }

    public GetMessage() {
        return this.message;
    }

    public IsPassed() {
        return this.passed;
    }

}