export class TestResult {

    constructor(private testName: string, private path: string, private message: string, private passed: boolean) {

    }

    /**
     * Get the name of the test
     */
    public GetTestName() {
        return this.testName;
    }

    /**
     * Get the path of the test
     */
    public GetPath() {
        return this.path;
    }

    /**
     * Get the message of the test
     */
    public GetMessage() {
        return this.message;
    }

    /**
     * Returns true if the test passed
     */
    public IsPassed() {
        return this.passed;
    }

}