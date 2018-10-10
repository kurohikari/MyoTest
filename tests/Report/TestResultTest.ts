import { TestResult } from "../../src/Report/TestResult";
import { Test } from "../../src/Test/Test";

Test("Test test name", (test) => {
    let name = "This is a test";
    let result = new TestResult(name, "", "", true);
    test.Equals(result.GetTestName(), name);
});