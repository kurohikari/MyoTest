import { Test } from "../../src/Test/Test";
import { TestCase } from "../../src/Test/TestCase";

Test("Test TestCase name", (test) => {
    let testCase = new TestCase("Test");
    test.Equals(testCase.GetName(), "Test");
});