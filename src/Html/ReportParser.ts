import { DirStructure } from "../Report/DirStructure";
import { Report } from "../Report/Report";
import { HTMLReport } from "./HtmlReport";
import { Css } from "./Css";
import { Js } from "./Js";
import * as path from "path";
import * as fs from "fs";

export class ReportParser {

    private constructor(private report: Report) {}

    public static ParseReport() {
        (new ReportParser(Report.GetReport())).Parse();
    }

    private Parse() {
        let structure = this.report.GetStructure();
        let output = this.report.GetOutput();
        this.ParseStructure(structure, output);
    }

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
        let files = structure.GetFiles();
        for(let file of Object.keys(files)) {
            let tests = files[file];
            if(tests.length > 0) {
                let htmlReport = new HTMLReport(file);
                for(let test of tests) {
                    htmlReport.AddTest(test);
                }
                htmlReport.SaveAsHTML(currentPath);
            }
        }
        for(let sub of structure.GetChildren()) {
            let newPath = path.join(currentPath, sub.GetName());
            this.ParseStructure(sub, newPath);
        }
    }

}