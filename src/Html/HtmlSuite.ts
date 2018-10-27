import { TestSample } from "../Report/TestSample";
import { RSuite } from "../Resources/Resources";
import { TestCase } from "../Test/TestCase";
import { Report } from "../Report/Report";
import { Suite } from "../Test/Suite";
import { SideBar } from "./SideBar";
import * as path from "path";
import * as fs from "fs";

export class HTMLSuite {

    private path: string;

    constructor(private suite: Suite) {
        if(suite.TestCases().length > 0) this.path = suite.GetPath();
    }

    /**
     * Generates the tests to be included in the report
     */
    private GenerateTests(): string[] {
        let toReturn: string[] = [];
        for(let test of this.suite.TestCases()) {
            toReturn.push(this.GenerateTest(test));
        }
        return toReturn;
    }

    /**
     * Generate an html test using the given test
     * @param test 
     */
    private GenerateTest(test: TestCase): string {
        return ((!test.WasFailed()) ? this.GenerateOKTest(test) : this.GenerateKOTest(test));
    }

    /**
     * Generate an OK test report using the test passed
     * @param test 
     */
    private GenerateOKTest(test: TestCase): string {
        let codeLines = this.GenerateOKLines(test);
        return RSuite.okTest.replace("{{testname}}", test.GetName())
            .replace("{{testlink}}", path.join(".", "testcases", `${path.parse(test.GetName()).name}.html`))
            .replace("{{info}}", codeLines.join("\n"));
    }

    /**
     * Generates a list of html ok lines using the given test
     * @param messages 
     */
    private GenerateOKLines(test: TestCase): string[] {
        let toReturn: string[] = [];
        let testSample = new TestSample(test);
        for(let num of test.GetSuccessLines()) {
            toReturn.push(this.GenerateOKLine(testSample, num));
        }
        return toReturn;
    }

    /**
     * Generates an html ok line using the given info
     * @param info 
     */
    private GenerateOKLine(testSample: TestSample, lineNumber: number): string {
        return RSuite.okLine.replace("{{codeline}}", testSample.GetLineAt(lineNumber))
            .replace("{{linenumber}}", `${lineNumber}`);
    }

    /**
     * Generate a KO test report using the test passed
     * @param test 
     */
    private GenerateKOTest(test: TestCase): string {
        let codeLines = this.GenerateKOLines(test);
        return RSuite.koTest.replace("{{name}}", test.GetName())
            .replace("{{testlink}}", path.join(".", "testcases", `${path.parse(test.GetName()).name}.html`))
            .replace("{{lines}}", codeLines.join("\n"))
            .replace("{{error}", test.GetErrorTrace())
    }

    /**
     * Generates a list of html ko lines using the given list of messages
     * @param messages 
     */
    private GenerateKOLines(test: TestCase): string[] {
        let sample = new TestSample(test);
        let toReturn: string[] = [];
        for(let num of test.GetSuccessLines()) {
            toReturn.push(this.GenerateKOLine(sample.GetLineAt(num), num));
        }
        return toReturn;
    }

    /**
     * Generates an html ko line using the given info
     * @param info 
     */
    private GenerateKOLine(line: string, lineNumber: number): string {
        return RSuite.koLine.replace("{{codeline}}", line)
            .replace("{{linenumber}}", `${lineNumber}`);
    }

    /**
     * Returns an html string describing the path to the suite with links to prior directories
     */
    private GetPathWithLinks(): string {
        let base = path.parse(Report.GetReport().GetSource()).base;
        this.path = this.path.replace(Report.GetReport().GetSource(), base);
        let items = this.path.split(path.sep);
        let links: string[] = [];
        for(let i=0; i<items.length; i++) {
            let item = items[items.length-1-i];
            if(i === 0) {
                links.unshift(
                    RSuite.titleLink.replace("{{pathtofile}}", "#")
                        .replace("{{item}}", item)
                );
            } else {
                let pathToFile = "";
                for(let j=0; j<i-1; j++) {
                    pathToFile = path.join(pathToFile, "..");
                }
                pathToFile = path.join(pathToFile, `dir_${item}.html`);
                links.unshift(
                    RSuite.titleLink.replace("{{pathtofile}}", pathToFile)
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
        let numPasses = this.suite.PassCount();
        let numFails = this.suite.FailCount();
        let tot = numPasses + numFails;
        if(numFails === 0 && numPasses === 0) return '<div class="analysis">No test was run!</div>';
        else {
            let percentage = (numPasses*100/tot).toFixed(2);
            let passes = (numPasses === 1) ? "1 test passed!" : `${numPasses} tests passed!`;
            let fails = (numFails === 1) ? "1 test failed!" : `${numFails} tests failed!`;
            return RSuite.analysis.replace("{{percentage}}", percentage)
                .replace("{{passes}}", passes)
                .replace("{{fails}}", fails);
        }
    }

    /**
     * Parse and save the report as an html at the given path
     * @param htmlPath path where to save report
     */
    public SaveAsHTML(htmlPath: string): void {
        let file = this.suite.GetFile();
        let purename = file.substring(0, file.indexOf(path.parse(file).ext));
        let name = `${purename}.html`;
        let filePath = path.join(htmlPath, name);
        let links = this.GetPathWithLinks();
        let analysis = this.GenerateAnalysis();
        let sidebar = SideBar.GenerateSideBar(filePath);
        let tests = this.GenerateTests();

        let toWrite = RSuite.base.replace("{{filepure}}", purename)
            .replace("{{title}}", this.suite.GetFile())
            .replace("{{sidebar}}", sidebar)
            .replace("{{path}}", links)
            .replace("{{analysis}}", analysis)
            .replace("{{tests}}", tests.join("\n"));

        fs.writeFileSync(filePath, toWrite);
    }

}