import { TestCase, Test } from "../../src/Test/Test";

Test("Test TestCase name", (test) => {
    let testCase = new TestCase("Test");
    test.Equals(testCase.GetName(), "Test");
});