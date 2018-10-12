import { TestResult } from "./TestResult";

export class TestSuite {

    private tests: TestResult[];
    private numPassed: number;
    private numFailed: number;

    constructor(private fileName: string) {
        this.tests = [];
        this.numPassed = 0;
        this.numFailed = 0;
    }

    /**
     * Adds a test to the test suite
     * @param test 
     */
    public AddTest(test: TestResult) {
        this.tests.push(test);
        (test.IsPassed()) ? this.numPassed++ : this.numFailed++;
    }

    /**
     * Gets the tests of the test suite
     */
    public GetTests() {
        return this.tests;
    }

    /**
     * Return true when the test suite has test results
     */
    public HasTests() {
        return (this.tests.length > 0);
    }

    /**
     * Merges the current suite into the given test suite
     * @param anotherSuite the suite to merge into
     */
    public MergeInto(anotherSuite: TestSuite) {
        for(let test of this.tests) {
            if(!anotherSuite.HasTest(test)) {
                anotherSuite.AddTest(test);
            }
        }
    }

    /**
     * Returns true when a test result in the suite has the same name and info as the test passed
     * @param test the test to check
     */
    public HasTest(test: TestResult) {
        for(let t of this.tests) {
            if(t === test) {
                return true;
            }
        }
        return false;
    }

    /**
     * Return the file name of the test suite
     */
    public GetFileName() {
        return this.fileName;
    }

    /**
     * Returns the number of tests passed in the test suite
     */
    public GetPassCount() {
        return this.numPassed;
    }

    /**
     * Returns the number of tests failed in the test suite
     */
    public GetFailCount() {
        return this.numFailed;
    }

    /**
     * Returns the percentage of tests passed
     */
    public PercentPassed() {
        if(this.numPassed === 0 && this.numFailed === 0) throw new Error("Test suite has no tests!");
        return (this.numPassed*100/(this.numFailed+this.numPassed));
    }

    /**
     * Returns true when all tests in the suite passed
     */
    public IsClean() {
        return (this.numPassed > 0 && this.numFailed === 0);
    }

}