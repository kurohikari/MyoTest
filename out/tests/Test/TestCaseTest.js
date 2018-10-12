"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Test_1 = require("../../src/Test/Test");
Test_1.Test("Test TestCase name", (test) => {
    let testCase = new Test_1.TestCase("Test");
    test.Equals(testCase.GetName(), "Test");
});
