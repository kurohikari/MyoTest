"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const TestCase_1 = require("./TestCase");
let suites = [];
class Suite {
    constructor(filepath) {
        this.path = filepath;
        this.file = path.parse(filepath).base;
        this.testCases = [];
        this.testFuncs = [];
        this.setupFunction = null;
        this.teardownFunction = null;
    }
    /**
     * Returns a test suite for the given file path
     * @param filepath
     */
    static Get(filepath) {
        let suite = new Suite(filepath);
        let found = false;
        for (let s of suites) {
            if (s.GetPath() === filepath) {
                suite = s;
                found = true;
                break;
            }
        }
        if (!found) {
            suites.push(suite);
        }
        return suite;
    }
    /**
     * Get all available test suites
     */
    static GetAll() {
        return suites;
    }
    /**
     * adds a testcase with its test function
     * @param testCase
     * @param testFunc
     */
    AddTestCase(testCase, testFunc = null) {
        this.testCases.push(testCase);
        this.testFuncs.push(testFunc);
    }
    /**
     * Runs all the test cases in the test suite
     */
    async RunTests() {
        for (let i = 0; i < this.testFuncs.length; i++) {
            let test = this.testCases[i];
            let testFunc = this.testFuncs[i];
            try {
                await testFunc(test);
            }
            catch (error) {
                test.SetError(error);
            }
        }
    }
    /**
     * removes all the test functions (used before passing to myotest)
     */
    ClearTests() {
        this.testFuncs = [];
    }
    /**
     * Returns the filenane of the test suite
     */
    GetFile() {
        return this.file;
    }
    /**
     * Returns the path of the test suite
     */
    GetPath() {
        return this.path;
    }
    /**
     * Returns the test cases in the test suite
     */
    TestCases() {
        return this.testCases;
    }
    /**
     * Sets the setup function of the test suite
     * @param setup
     */
    SetOnSetup(setup) {
        this.setupFunction = setup;
    }
    /**
     * Runs the setup function
     */
    async Setup() {
        if (this.setupFunction !== null) {
            await this.setupFunction();
        }
    }
    /**
     * Sets the teardown function of the test suite
     * @param teardown
     */
    SetOnTeardown(teardown) {
        this.teardownFunction = teardown;
    }
    /**
     * Runs the teardown function
     */
    async Teardown() {
        if (this.teardownFunction !== null) {
            await this.teardownFunction();
        }
    }
    /**
     * Checks if any testcase has a test in the testsuite
     */
    HasTests() {
        for (let testcase of this.testCases) {
            if (testcase.GetSuccessLines().length > 0 || testcase.WasFailed()) {
                return true;
            }
        }
        return false;
    }
    /**
     * Checks if no testcase was failed
     */
    IsClean() {
        for (let testcase of this.testCases) {
            if (testcase.WasFailed())
                return false;
        }
        return true;
    }
    /**
     * Returns the number of testcases passed
     */
    PassCount() {
        let count = 0;
        for (let testcase of this.testCases) {
            if (!testcase.WasFailed())
                count++;
        }
        return count;
    }
    /**
     * Returns the number of testcases failed
     */
    FailCount() {
        let count = 0;
        for (let testcase of this.testCases) {
            if (testcase.WasFailed())
                count++;
        }
        return count;
    }
    /**
     * Creates a Suite from a JSON object
     * @param object
     */
    static FromObject(object) {
        let suite = new Suite(object.path);
        for (let testcase of object.testCases) {
            let testCase = TestCase_1.TestCase.FromObject(testcase);
            suite.AddTestCase(testCase);
        }
        suites.push(suite);
        return suite;
    }
}
exports.Suite = Suite;
