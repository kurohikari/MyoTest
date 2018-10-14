import { TestResult } from "../Report/TestResult";
import { Test } from "../Resources/Resources";
import * as path from "path";
import * as fs from "fs";
import { CodeInfo } from "../Report/CodeInfo";
import { TestPortion } from "../Report/TestPortion";
import { SideBar } from "./SideBar";

export class HTMLTest {

    constructor(private test: TestResult) {}

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

    private GenerateCodeLine(line: string, num: number): string {
        return Test.line.replace("{{linenumber}}", `${num}`)
            .replace("{{line}}", line);
    }

    public SaveAsHTML(htmlPath: string) {
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