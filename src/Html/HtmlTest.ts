import { Test } from "../Resources/Resources";
import { SideBar } from "./SideBar";
import * as path from "path";
import * as fs from "fs";
import { TestSample } from "../Report/TestSample";
import { TestCase } from "../Test/TestCase";

export class HTMLTest {

    constructor(private test: TestCase) {}

    /**
     * Generates the lines of code of the test case
     * @param info 
     */
    private GenerateCodeLines(): string[] {
        let sample = new TestSample(this.test);
        let lines = [];
        for(let i = 0; i<sample.GetLines().length; i++) {
            let line = sample.GetLines()[i];
            let lineNumber = sample.StartLine() + i;
            lines.push(this.CodeLineAsHTML(line, sample.GetClass(lineNumber), lineNumber));
        }
        return lines;
    }

    /**
     * Generates one line of code for the test case
     * @param line 
     * @param num 
     */
    private GenerateCodeLine(line: string, num: number): string {
        return Test.line.replace("{{linenumber}}", `${num}`)
            .replace("{{line}}", line);
    }

    private CodeLineAsHTML(line: string, lineClass: string, lineNumber: number) {
        return Test.line.replace("{{color}}", lineClass)
            .replace("{{linenumber}}", `${lineNumber}`)
            .replace("{{line}}", line);
    }

    /**
     * Save the testcase source
     * @param htmlPath 
     */
    public SaveAsHTML(htmlPath: string) {
        if(this.test.WasFailed()) {
            this.SaveFullHTML(htmlPath);
        } else {
            if(this.test.GetSuccessLines().length === 0 && !this.test.WasFailed()) {
                this.SaveEmptyHTML(htmlPath);
            } else {
                this.SaveFullHTML(htmlPath);
            }
        }
    }

    /**
     * Save the test case when it does not contain any test
     * @param htmlPath 
     */
    public SaveEmptyHTML(htmlPath: string): void {
        let filePath = path.join(htmlPath, `${this.test.GetName()}.html`);
        let toWrite = Test.base.replace("{{filepure}}", this.test.GetName())
            .replace("{{title}}", this.test.GetName())
            .replace("{{path}}", this.test.GetFilePath())
            .replace("{{sidebar}}", SideBar.GenerateSideBar(filePath))
            .replace("{{code}}", "The testcase did not contain any test...");
        fs.writeFileSync(path.join(htmlPath, `${this.test.GetName()}.html`), toWrite);
    }

    /**
     * Save the test case when it does have tests
     * @param htmlPath 
     */
    public SaveFullHTML(htmlPath: string): void {
        let filePath = path.join(htmlPath, `${this.test.GetName()}.html`);
        let toWrite = Test.base.replace("{{filepure}}", this.test.GetName())
            .replace("{{title}}", this.test.GetName())
            .replace("{{path}}", this.test.GetFilePath())
            .replace("{{sidebar}}", SideBar.GenerateSideBar(filePath))
            .replace("{{code}}", this.GenerateCodeLines().join("\n"));
        fs.writeFileSync(path.join(htmlPath, `${this.test.GetName()}.html`), toWrite);
    }

}