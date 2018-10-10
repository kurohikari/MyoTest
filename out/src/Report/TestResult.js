"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestResult {
    constructor(testName, path, message, passed) {
        this.testName = testName;
        this.path = path;
        this.message = message;
        this.passed = passed;
    }
    GetTestName() {
        return this.testName;
    }
    GetPath() {
        return this.path;
    }
    GetMessage() {
        return this.message;
    }
    IsPassed() {
        return this.passed;
    }
}
exports.TestResult = TestResult;
