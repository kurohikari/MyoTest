import { Report } from "../Report/Report";
import { DirStructure } from "../Report/DirStructure";
import * as path from "path";

const basicHtml = `<div class="sub-div">\n<a href="#"><div class="sub-name">{{structure}}</div></a>\n{{files}}{{dirs}}</div>`;

export class SideBar {

    public static GenerateSideBar(currentPath: string) {
        let report = Report.GetReport();
        let structure = report.GetStructure();
        let output = report.GetOutput();
        return this.GenerateStructure(structure, output, currentPath);
    }

    private static GenerateStructure(structure: DirStructure, outputPath: string, currentPath: string) {
        let div = basicHtml.replace("{{structure}}", structure.GetName());
        let files = structure.GetFiles();
        let fileDivs = "";
        for(let file of files) {
            let tests = structure.GetTests(file);
            if(tests.length > 0) {
                let href = path.join(path.relative(path.dirname(currentPath), outputPath), file.replace(path.parse(file).ext, ".html"));
                let fileDiv = `<a href="${href}"><div class="file-div">${file}</div></a>\n`;
                fileDivs += fileDiv;
            }
        }
        let res = div.replace("{{files}}", fileDivs);
        let subDivs = "";
        for(let sub of structure.GetChildren()) {
            if(!sub.HasTests()) continue;
            let newPath = path.join(outputPath, sub.GetName());
            let subDiv = this.GenerateStructure(sub, newPath, currentPath);
            subDivs += subDiv + "\n";
        }
        return res.replace("{{dirs}}", subDivs);
    }

}