import { TestResult } from "../Report/TestResult";
import { Test } from "../Resources/Resources";

export class HTMLTest {

    constructor(private test: TestResult) {

    }

    private GenerateAnalysis() {
        let passedClass = "";
        let isPassed = "";
        let message = "";
        if(this.test.IsPassed()) {
            passedClass = "test-passed";
            isPassed = "Passed:";
            message = "";
        } else {
            passedClass = "test-failed";
            isPassed = "Failed:";
        }
        return Test.analysis.replace("{{passedclass}}", passedClass)
            .replace("{{ispassed}}", isPassed)
            .replace("{{message}}", "");

    }

    public SaveAsHTML() {
        let toWrite = Test.base.replace("{{filepure}}", this.test.GetTestName())
            .replace("{{title}}", this.test.GetTestName())
            .replace("{{path}}", this.test.GetPath());
    }

}