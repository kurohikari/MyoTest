import { TestPortion } from "../Report/TestPortion";
import { TestResult } from "../Report/TestResult";
import { Test } from "../Resources/Resources";
import { CodeInfo } from "../Report/CodeInfo";
import { SideBar } from "./SideBar";
import * as path from "path";
import * as fs from "fs";

export class HTMLTest {

    constructor(private test: TestResult) {}

    /**
     * Generates the lines of code of the test case
     * @param info 
     */
    private GenerateCodeLines(info: CodeInfo): string[] {
        let portion = new TestPortion(info);
        let lines = [];
        let codeLines = portion.GetCodeLines();
        for(let i=0; i<codeLines.length; i++) {
            let codeLine = codeLines[i];
            lines.push(this.GenerateCodeLine(codeLine, i+info.GetTestStartLine()));
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

    /**
     * Save the testcase source
     * @param htmlPath 
     */
    public SaveAsHTML(htmlPath: string) {
        if(!this.test.IsPassed()) {
            this.SaveFullHTML(htmlPath);
        } else {
            let object = JSON.parse(this.test.GetMessage());
            if(!object || !object.length || object.length === 0 ) {
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
        let filePath = path.join(htmlPath, `${this.test.GetTestName()}.html`);
        let toWrite = Test.base.replace("{{filepure}}", this.test.GetTestName())
            .replace("{{title}}", this.test.GetTestName())
            .replace("{{path}}", this.test.GetPath())
            .replace("{{sidebar}}", SideBar.GenerateSideBar(filePath))
            .replace("{{code}}", "The testcase did not contain any test...");
        fs.writeFileSync(path.join(htmlPath, `${this.test.GetTestName()}.html`), toWrite);
    }

    /**
     * Save the test case when it does have tests
     * @param htmlPath 
     */
    public SaveFullHTML(htmlPath: string): void {
        let object = JSON.parse(this.test.GetMessage());
        let info: CodeInfo = this.test.IsPassed() ? new CodeInfo(object[0]["paths"], path.parse(this.test.GetPath()).base) : new CodeInfo(object["err"]["stackMessage"].split("\n"), path.parse(this.test.GetPath()).base);
        let filePath = path.join(htmlPath, `${this.test.GetTestName()}.html`);
        let toWrite = Test.base.replace("{{filepure}}", this.test.GetTestName())
            .replace("{{title}}", this.test.GetTestName())
            .replace("{{path}}", this.test.GetPath())
            .replace("{{sidebar}}", SideBar.GenerateSideBar(filePath))
            .replace("{{code}}", this.GenerateCodeLines(info).join("\n"));
        fs.writeFileSync(path.join(htmlPath, `${this.test.GetTestName()}.html`), toWrite);
    }

}