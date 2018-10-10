import { TestResult } from "../Report/TestResult";
import { Report } from "../Report/Report";
import * as path from "path";
import * as fs from "fs";

const html = `
<!DOCTYPE html>
<html>
    <head>
        <title>{{filepure}}</title>
        <link rel="stylesheet" href="./myocss.css">
    </head>
    <body>
        {{title}}
        {{tests}}
    </body>
</html>
`;

export class HTMLReport {

    private file: string;
    private title: string;
    private tests: string[];
    private testResults: TestResult[];

    constructor(file: string) {
        this.file = file;
        this.title = `<div>${file}</div>`;
        this.tests = [];
        this.testResults = [];
    }

    public GetTitle() {
        return this.title;
    }

    public AddTest(test: TestResult) {
        if(test.IsPassed()) {
            this.tests.push(`<div><div>${test.GetTestName()}</div><div>${test.GetMessage()}</div></div>`);
        } else {
            let error = JSON.parse(test.GetMessage());
            this.tests.push(`<div><div><div>${test.GetTestName()}</div><div>${error.errorMessage}</div></div><div>${error.stackMessage}</div></div>`);
        }
        this.testResults.push(test);
    }

    public SaveAsHTML() {
        let name = this.file.substring(0, this.file.length-3) + ".html";
        let testsStr = "";
        for(let test of this.tests) {
            testsStr += test + "\n";
        }
        let toWrite = html.replace("{{filepure}}", this.file.substring(0, this.file.length-3))
        .replace("{{title}}", this.title)
        .replace("{{tests}}", testsStr);
        let stream = fs.createWriteStream(path.join(Report.GetReport().GetOutput(), name));
        stream.write(toWrite, (error) => {
            if(error) {
                console.error(`Could not write ${name}`);
                console.error(error);
            } else stream.close();
        });
    }

}