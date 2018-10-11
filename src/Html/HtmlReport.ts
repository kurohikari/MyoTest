import { TestResult } from "../Report/TestResult";
import { SideBar } from "./SideBar";
import * as path from "path";
import * as fs from "fs";

/**
 * base html to use to create the html file
 */
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
            {{sidebar}}
        </div>
        
        <!-- Use any element to open the sidenav -->
        <div class="open-button" onclick="openNav()">&lt;</div>
        {{title}}
        <div class="divider"></div>
        <div class="analysis">{{analysis}}</div>
        {{tests}}
    </body>
</html>
`;

export class HTMLReport {

    private file: string;
    private path: string;
    private title: string;
    private tests: string[];
    private testResults: TestResult[];

    constructor(file: string) {
        this.file = file;
        this.path = "";
        this.title = `<div class="title">${file} ({{path}})</div>`;
        this.tests = [];
        this.testResults = [];
    }

    /**
     * Get the title of the html report
     */
    public GetTitle() {
        return this.title;
    }

    /**
     * Adds a test result to the report
     * @param test test result to add
     */
    public AddTest(test: TestResult) {
        this.path = test.GetPath();
        if(test.IsPassed()) {
            this.tests.push(`<div class="ok-test"><div class="test-name">${test.GetTestName()}</div><div>${test.GetMessage()}</div></div>`);
        } else {
            let error = JSON.parse(test.GetMessage());
            this.tests.push(`<div class="ko-test"><div class="ko-head"><div class="test-name">${test.GetTestName()}</div><div>${error.errorMessage}</div></div><div><pre>${error.stackMessage}</pre></div></div>`);
        }
        this.testResults.push(test);
    }

    /**
     * Parse and save the report as an html at the given path
     * @param htmlPath path where to save report
     */
    public SaveAsHTML(htmlPath: string) {
        let name = this.file.substring(0, this.file.length-3) + ".html";
        let testsStr = "";
        for(let test of this.tests) {
            testsStr += test + "\n";
        }
        let num = 0;
        let denom = 0;
        for(let res of this.testResults) {
            denom++;
            if(res.IsPassed()) {
                num++;
            }
        }
        let analysisMessage = (denom > 0) ? `${(num/denom*100).toFixed(2)}% tests passed!`: "No test was run!";
        let filePath = path.join(htmlPath, name);
        let toWrite = html.replace("{{filepure}}", this.file.substring(0, this.file.length-3))
        .replace("{{title}}", this.title)
        .replace("{{sidebar}}", SideBar.GenerateSideBar(filePath))
        .replace("{{path}}", this.path)
        .replace("{{analysis}}", analysisMessage)
        .replace("{{tests}}", testsStr);
        let stream = fs.createWriteStream(filePath);
        stream.write(toWrite, (error) => {
            if(error) {
                console.error(`Could not write ${name}`);
                console.error(error);
            } else stream.close();
        });
    }

}