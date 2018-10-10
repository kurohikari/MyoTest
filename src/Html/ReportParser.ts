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
        let tests = this.report.GetTests();
        if(!fs.existsSync(path.join(this.report.GetOutput(), "myo-css.css"))) {
            fs.writeFileSync(path.join(this.report.GetOutput(), "myo-css.css"), Css);
        }
        if(!fs.existsSync(path.join(this.report.GetOutput(), "myo-js.js"))) {
            fs.writeFileSync(path.join(this.report.GetOutput(), "myo-js.js"), Js);
        }
        for(let file of Object.keys(tests)) {
            let results = tests[file];
            let html = new HTMLReport(file);
            for(let result of results) {
                html.AddTest(result);
            }
            html.SaveAsHTML();
        }
    }

}