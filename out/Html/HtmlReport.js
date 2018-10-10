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
        <script src="./myo-js.js"></script>
    </head>
    <body>
        <div id="mySidenav" class="sidenav">
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
        </div>
        
        <!-- Use any element to open the sidenav -->
        <span onclick="openNav()">open</span>
        {{title}}
        <div class="divider"></div>
        <div class="analysis">{{analysis}}</div>
        {{tests}}
    </body>
</html>
`;
class HTMLReport {
    constructor(file) {
        this.file = file;
        this.path = "";
        this.title = `<div class="title">${file} ({{path}})</div>`;
        this.tests = [];
        this.testResults = [];
    }
    GetTitle() {
        return this.title;
    }
    AddTest(test) {
        this.path = test.GetPath();
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
        let num = 0;
        let denom = 0;
        for (let res of this.testResults) {
            denom++;
            if (res.IsPassed()) {
                num++;
            }
        }
        let analysisMessage = (denom > 0) ? `${(num / denom * 100).toFixed(2)}% tests passed!` : "No test was run!";
        let toWrite = html.replace("{{filepure}}", this.file.substring(0, this.file.length - 3))
            .replace("{{title}}", this.title)
            .replace("{{path}}", this.path)
            .replace("{{analysis}}", analysisMessage)
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
