"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestResult {
    constructor(testName, path, message, passed) {
        this.testName = testName;
        this.path = path;
        this.message = message;
        this.passed = passed;
    }
    /**
     * Get the name of the test
     */
    GetTestName() {
        return this.testName;
    }
    /**
     * Get the path of the test
     */
    GetPath() {
        return this.path;
    }
    /**
     * Get the message of the test
     */
    GetMessage() {
        return this.message;
    }
    /**
     * Returns true if the test passed
     */
    IsPassed() {
        return this.passed;
    }
}
exports.TestResult = TestResult;
