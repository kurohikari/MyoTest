import { Test } from "../../src/Test/Test";
import { TestResult } from "../../src/Report/TestResult";
import { DirStructure } from "../../src/Report/DirStructure";

Test("Test structure has test", (test) => {
    let result = new TestResult("Test 1", "Test.js", "OK", true);
    let structure = new DirStructure("Root", true);
    structure.AddTest(result);
    test.True(structure.HasTests());
    test.StrictEquals(structure.GetFiles().length, 1);
    test.StrictEquals(structure.GetFiles()[0], "Test.js")
    test.StrictEquals(structure.GetTests("Test.js").length, 1);
    test.StrictEquals(structure.GetTests("Test.js")[0], result);
});