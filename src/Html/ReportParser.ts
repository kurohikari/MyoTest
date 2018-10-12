import { DirStructure } from "../Report/DirStructure";
import { Js, Css } from "../Resources/Resources";
import { HtmlDirectory } from "./HtmlDirectory";
import { Report } from "../Report/Report";
import { HTMLReport } from "./HtmlReport";
import * as path from "path";
import * as fs from "fs";

export class ReportParser {

    private constructor(private report: Report) {}

    public static ParseReport() {
        (new ReportParser(Report.GetReport())).Parse();
    }

    /**
     * Parse the current report
     */
    private Parse() {
        let structure = this.report.GetStructure();
        let output = this.report.GetOutput();
        this.ParseStructure(structure, output);
    }

    /**
     * Parse the structure and its children into the report folder recursively
     * @param structure structure to follow
     * @param currentPath path where to output report
     */
    private ParseStructure(structure: DirStructure, currentPath: string) {
        if(!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath);
        }
        if(!fs.existsSync(path.join(currentPath, "myo-css.jss"))) {
            fs.writeFileSync(path.join(currentPath, "myo-css.css"), Css);
        }
        if(!fs.existsSync(path.join(currentPath, "myo-js.js"))) {
            fs.writeFileSync(path.join(currentPath, "myo-js.js"), Js);
        }
        for(let suite of structure.GetTestSuites()) {
            if(suite.HasTests()) {
                let htmlReport = new HTMLReport(suite.GetFileName());
                for(let test of suite.GetTests()) {
                    htmlReport.AddTest(test, suite.GetFileName());
                }
                htmlReport.SaveAsHTML(currentPath);
            }
        }
        (new HtmlDirectory(structure)).SaveAsHTML(currentPath);
        for(let sub of structure.GetChildren()) {
            if(!sub.HasTests()) continue;
            let newPath = path.join(currentPath, sub.GetName());
            this.ParseStructure(sub, newPath);
        }
    }

}