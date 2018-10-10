import { Test } from "../../src/Test/Test";
import { TestResult } from "../../src/Report/TestResult";
import { DirStructure } from "../../src/Report/DirStructure";

Test("Test structure has test", (test) => {
    let result = new TestResult("Test 1", "Test.js", "OK", true);
    let structure = new DirStructure("Root", true);
    structure.AddTest(result);
    test.True(structure.HasTests());
    test.Equals(structure.GetFiles().length, 1);
    test.Equals(structure.GetFiles()[0], "Test.js")
    test.Equals(structure.GetTests("Test.js").length, 1);
    test.DeepEquals(structure.GetTests("Test.js")[0], result);
});

Test("Test deep structure has test", (test) => {
    let result = new TestResult("Test 1", "Test.js", "OK", true);
    let structure1 = new DirStructure("Root", true);
    let structure2 = new DirStructure("Test");
    structure2.AddTest(result);
    structure1.AddChild(structure2);
    test.True(structure1.HasTests());
    test.Equals(structure1.GetFiles().length, 0);
    test.Equals(structure1.GetChildren().length, 1);
    test.True(structure1.HasChild(structure2));
    test.DeepEquals(structure1.GetChild(structure2.GetName()), structure2);
    test.Equals(structure1.GetChild(structure2.GetName()).GetTests("Test.js").length, 1);
    test.DeepEquals(structure1.GetChild(structure2.GetName()).GetTests("Test.js")[0], result);
});