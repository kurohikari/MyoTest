"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Report_1 = require("../Report/Report");
const path = require("path");
const fs = require("fs");
const html = `
<!DOCTYPE html>
<html>
    <head>
        <title>{{filepure}}</title>
        <link rel="stylesheet" href="./myo-css.css">
    </head>
    <body>
        {{title}}
        {{tests}}
    </body>
</html>
`;
class HTMLReport {
    constructor(file) {
        this.file = file;
        this.title = `<div class="title">${file}</div>`;
        this.tests = [];
        this.testResults = [];
    }
    GetTitle() {
        return this.title;
    }
    AddTest(test) {
        if (test.IsPassed()) {
            this.tests.push(`<div class="ok-test"><div class="test-name">${test.GetTestName()}</div><div>${test.GetMessage()}</div></div>`);
        }
        else {
            let error = JSON.parse(test.GetMessage());
            this.tests.push(`<div class="ko-test"><div class="ko-head"><div class="test-name">${test.GetTestName()}</div><div>${error.errorMessage}</div></div><div><pre>${error.stackMessage}</pre></div></div>`);
        }
        this.testResults.push(test);
    }
    SaveAsHTML() {
        let name = this.file.substring(0, this.file.length - 3) + ".html";
        let testsStr = "";
        for (let test of this.tests) {
            testsStr += test + "\n";
        }
        let toWrite = html.replace("{{filepure}}", this.file.substring(0, this.file.length - 3))
            .replace("{{title}}", this.title)
            .replace("{{tests}}", testsStr);
        let stream = fs.createWriteStream(path.join(Report_1.Report.GetReport().GetOutput(), name));
        stream.write(toWrite, (error) => {
            if (error) {
                console.error(`Could not write ${name}`);
                console.error(error);
            }
            else
                stream.close();
        });
    }
}
exports.HTMLReport = HTMLReport;
