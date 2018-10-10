"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Test_1 = require("../../src/Test/Test");
const TestResult_1 = require("../../src/Report/TestResult");
const DirStructure_1 = require("../../src/Report/DirStructure");
Test_1.Test("Test structure has test", (test) => {
    let result = new TestResult_1.TestResult("Test 1", "Test.js", "OK", true);
    let structure = new DirStructure_1.DirStructure("Root", true);
    structure.AddTest(result);
    test.True(structure.HasTests());
    test.StrictEquals(structure.GetFiles().length, 1);
    test.StrictEquals(structure.GetFiles()[0], "Test.js");
    test.StrictEquals(structure.GetTests("Test.js").length, 1);
    test.StrictEquals(structure.GetTests("Test.js")[0], result);
});
