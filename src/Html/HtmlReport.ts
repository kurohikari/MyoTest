import { TestResult } from "../Report/TestResult";
import { CodeInfo } from "../Report/CodeInfo";
import { Html } from "../Resources/Resources";
import { SideBar } from "./SideBar";
import * as path from "path";
import * as fs from "fs";

export class HTMLReport {

    private file: string;
    private path: string;
    private title: string;
    private tests: string[];
    private testsPassed: TestResult[];
    private testsFailed: TestResult[];
    private testResults: TestResult[];

    constructor(file: string) {
        this.file = file;
        this.path = "";
        this.title = `<div class="title">${file} ({{path}})</div>`;
        this.tests = [];
        this.testsPassed = [];
        this.testsFailed = [];
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
    public AddTest(test: TestResult, file: string) {
        if(test.IsPassed()) this.testsPassed.push(test);
        else this.testsFailed.push(test);
        this.path = test.GetPath();
        if(test.IsPassed()) {
            let infos = JSON.parse(test.GetMessage());
            let infosStr = "";
            for(let info of infos) {
                let codeInfo = new CodeInfo(info["paths"], file);
                infosStr += `<div class="code-line">${codeInfo.GetCodeLine()} [${codeInfo.GetLine()}]</div>\n`;
            }
            this.tests.push(`<div class="ok-test"><div class="ok-head" onclick="Toggle(event)"><div class="test-name">${test.GetTestName()}</div></div><div class="toggable">${infosStr}</div></div>`);
        } else {
            let obj = JSON.parse(test.GetMessage());
            let infos = obj["info"];
            let err = obj["err"];
            let infosStr = "";
            for(let info of infos) {
                let codeInfo = new CodeInfo(info["paths"], file);
                infosStr += `<div class="code-line"><span class="good-fisheye">&#9673;&nbsp;&nbsp;</span>${codeInfo.GetCodeLine()} [${codeInfo.GetLine()}]</div>\n`;
            }
            this.tests.push(`<div class="ko-test"><div class="ko-head" onclick="Toggle(event)"><div class="test-name">${test.GetTestName()}</div></div><div class="toggable">${infosStr}\n<pre>${err.stackMessage}</pre></div></div>`);
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
        let filePath = path.join(htmlPath, name);
        let toWrite = Html.suite.replace("{{filepure}}", this.file.substring(0, this.file.length-3))
        .replace("{{title}}", this.title)
        .replace("{{sidebar}}", SideBar.GenerateSideBar(filePath))
        .replace("{{path}}", this.path)
        .replace("{{analysis}}", this.GenerateAnalysis())
        .replace("{{tests}}", testsStr);
        let stream = fs.createWriteStream(filePath);
        stream.write(toWrite, (error) => {
            if(error) {
                console.error(`Could not write ${name}`);
                console.error(error);
            } else stream.close();
        });
    }

    /**
     * Generates the analysis part of the html
     */
    private GenerateAnalysis() {
        let numPasses = this.testsPassed.length;
        let numFails = this.testsFailed.length;
        let tot = numPasses + numFails;
        if(numFails === 0 && numPasses === 0) return "No test was run!";
        else {
            let percentage = (numPasses*100/tot).toFixed(2);
            let passes = (numPasses === 1) ? "1 test passed!" : `${numPasses} tests passed!`;
            let fails = (numFails === 1) ? "1 test failed!" : `${numFails} tests failed!`;
            return `${percentage}%<div class="tests-passed" onclick="ShowSuccesses()">${passes}</div><div class="tests-failed" onclick="ShowFailures()">${fails}</div>`;
        }
    }

    /**
     * Get the list of tests passed in the html report
     */
    public GetTestsPassed() {
        return this.testsPassed;
    }

    /**
     * Get the list of tests failed in the html report
     */
    public GetTestsFailed() {
        return this.testsFailed;
    }

}