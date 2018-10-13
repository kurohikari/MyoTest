"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../Resources/Resources");
const fs = require("fs");
class HTMLTest {
    constructor(test) {
        this.test = test;
    }
    GenerateAnalysis() {
        let passedClass = "";
        let isPassed = "";
        let message = "";
        if (this.test.IsPassed()) {
            passedClass = "test-passed";
            isPassed = "Passed:";
            message = "";
        }
        else {
            passedClass = "test-failed";
            isPassed = "Failed:";
        }
        return Resources_1.Test.analysis.replace("{{passedclass}}", passedClass)
            .replace("{{ispassed}}", isPassed)
            .replace("{{message}}", "");
    }
    SaveAsHTML(htmlPath) {
        let toWrite = Resources_1.Test.base.replace("{{filepure}}", this.test.GetTestName())
            .replace("{{title}}", this.test.GetTestName())
            .replace("{{path}}", this.test.GetPath())
            .replace("{{analysis}}", "")
            .replace("{{code}}", "");
        fs.writeFileSync(htmlPath, toWrite);
    }
}
exports.HTMLTest = HTMLTest;
