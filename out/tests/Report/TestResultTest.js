"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestResult_1 = require("../../src/Report/TestResult");
const Test_1 = require("../../src/Test/Test");
Test_1.Test("Test test name", (test) => {
    let name = "This is a test";
    let result = new TestResult_1.TestResult(name, "", "", true);
    test.Equals(result.GetTestName(), name);
});
