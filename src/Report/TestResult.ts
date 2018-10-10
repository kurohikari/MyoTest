export class TestResult {

    constructor(private testName: string, private path: string, private message: string, private passed: boolean) {

    }

    public GetTestName() {
        return this.testName;
    }

    public GetPath() {
        return this.path;
    }

    public GetMessage() {
        return this.message;
    }

    public IsPassed() {
        return this.passed;
    }

}