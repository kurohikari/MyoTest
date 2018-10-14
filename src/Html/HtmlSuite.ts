import { TestResult } from "../Report/TestResult";
import { CodeInfo } from "../Report/CodeInfo";
import { Suite } from "../Resources/Resources";
import { SideBar } from "./SideBar";
import * as path from "path";
import * as fs from "fs";
import { TestSuite } from "../Report/TestSuite";
import { TestPortion } from "../Report/TestPortion";

export class HTMLSuite {

    private path: string;

    constructor(private suite: TestSuite) {
        if(suite.HasTests()) this.path = suite.GetTests()[0].GetPath();
    }

    /**
     * Generates the tests to be included in the report
     */
    private GenerateTests(): string[] {
        let toReturn: string[] = [];
        for(let test of this.suite.GetTests()) {
            toReturn.push(this.GenerateTest(test));
        }
        return toReturn;
    }

    /**
     * Generate an html test using the given test
     * @param test 
     */
    private GenerateTest(test: TestResult): string {
        return (test.IsPassed() ? this.GenerateOKTest(test) : this.GenerateKOTest(test));
    }

    /**
     * Generate an OK test report using the test passed
     * @param test 
     */
    private GenerateOKTest(test: TestResult): string {
        let codeLines = this.GenerateOKLines(test);
        return Suite.okTest.replace("{{testname}}", test.GetTestName())
            .replace("{{info}}", codeLines.join("\n"));
    }

    /**
     * Generates a list of html ok lines using the given test
     * @param messages 
     */
    private GenerateOKLines(test: TestResult): string[] {
        let toReturn: string[] = [];
        let messages = JSON.parse(test.GetMessage());
        for(let message of messages) {
            let info = new CodeInfo(message["paths"], this.suite.GetFileName());
            toReturn.push(this.GenerateOKLine(info));
        }
        return toReturn;
    }

    /**
     * Generates an html ok line using the given info
     * @param info 
     */
    private GenerateOKLine(info: CodeInfo): string {
        return Suite.okLine.replace("{{codeline}}", info.GetCodeLine())
            .replace("{{linenumber}}", `${info.GetLine()}`);
    }

    /**
     * Generate a KO test report using the test passed
     * @param test 
     */
    private GenerateKOTest(test: TestResult): string {
        let object = JSON.parse(test.GetMessage());
        let messages = object["info"];
        let error = object["err"];
        let codeLines = this.GenerateKOLines(messages);
        return Suite.koTest.replace("{{name}}", test.GetTestName())
            .replace("{{lines}}", codeLines.join("\n"))
            .replace("{{error}", error.stackMessage)
    }

    /**
     * Generates a list of html ko lines using the given list of messages
     * @param messages 
     */
    private GenerateKOLines(messages: any[]): string[] {
        let toReturn: string[] = [];
        for(let message of messages) {
            let info = new CodeInfo(message["paths"], this.suite.GetFileName());
            toReturn.push(this.GenerateKOLine(info));
        }
        return toReturn;
    }

    /**
     * Generates an html ko line using the given info
     * @param info 
     */
    private GenerateKOLine(info: CodeInfo): string {
        return Suite.koLine.replace("{{codeline}}", info.GetCodeLine())
            .replace("{{linenumber}}", `${info.GetLine()}`);
    }

    /**
     * Returns an html string describing the path to the suite with links to prior directories
     */
    private GetPathWithLinks(): string {
        let items = this.path.split(path.sep);
        let links: string[] = [];
        for(let i=0; i<items.length; i++) {
            let item = items[items.length-1-i];
            if(i === 0) {
                links.unshift(
                    Suite.titleLink.replace("{{pathtofile}}", "#")
                        .replace("{{item}}", item)
                );
            } else {
                let pathToFile = "";
                for(let j=0; j<i-1; j++) {
                    pathToFile = path.join(pathToFile, "..");
                }
                pathToFile = path.join(pathToFile, `dir_${item}.html`);
                links.unshift(
                    Suite.titleLink.replace("{{pathtofile}}", pathToFile)
                        .replace("{{item}}", item)
                );
            }
        }
        return links.join(path.sep);
    }

    /**
     * Generates the analysis part of the html
     */
    private GenerateAnalysis(): string {
        let numPasses = this.suite.GetPassCount();
        let numFails = this.suite.GetFailCount();
        let tot = numPasses + numFails;
        if(numFails === 0 && numPasses === 0) return '<div class="analysis">No test was run!</div>';
        else {
            let percentage = (numPasses*100/tot).toFixed(2);
            let passes = (numPasses === 1) ? "1 test passed!" : `${numPasses} tests passed!`;
            let fails = (numFails === 1) ? "1 test failed!" : `${numFails} tests failed!`;
            return Suite.analysis.replace("{{percentage}}", percentage)
                .replace("{{passes}}", passes)
                .replace("{{fails}}", fails);
        }
    }

    /**
     * Parse and save the report as an html at the given path
     * @param htmlPath path where to save report
     */
    public SaveAsHTML(htmlPath: string): void {
        let file = this.suite.GetFileName();
        let purename = file.substring(0, file.indexOf(path.parse(file).ext));
        let name = `${purename}.html`;
        let filePath = path.join(htmlPath, name);
        let links = this.GetPathWithLinks();
        let analysis = this.GenerateAnalysis();
        let sidebar = SideBar.GenerateSideBar(filePath);
        let tests = this.GenerateTests();

        let toWrite = Suite.base.replace("{{filepure}}", purename)
            .replace("{{title}}", this.suite.GetFileName())
            .replace("{{sidebar}}", sidebar)
            .replace("{{path}}", links)
            .replace("{{analysis}}", analysis)
            .replace("{{tests}}", tests.join("\n"));

        fs.writeFileSync(filePath, toWrite);
    }

}