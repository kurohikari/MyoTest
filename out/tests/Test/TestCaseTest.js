"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Test_1 = require("../../src/Test/Test");
const TestCase_1 = require("../../src/Test/TestCase");
Test_1.Test("Test TestCase name", (test) => {
    let testCase = new TestCase_1.TestCase("Test");
    test.Equals(testCase.GetName(), "Test");
});
