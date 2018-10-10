import { Report } from "../Report/Report";
import { HTMLReport } from "./HtmlReport";

export class ReportParser {

    private constructor(private report: Report) {}

    public static ParseReport() {
        (new ReportParser(Report.GetReport())).Parse();
    }

    private Parse() {
        let tests = this.report.GetTests();
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