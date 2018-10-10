"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestResult {
    constructor(testName, message, passed) {
        this.testName = testName;
        this.message = message;
        this.passed = passed;
    }
    GetTestName() {
        return this.testName;
    }
    GetMessage() {
        return this.message;
    }
    IsPassed() {
        return this.passed;
    }
}
exports.TestResult = TestResult;
