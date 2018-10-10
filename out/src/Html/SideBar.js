"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Report_1 = require("../Report/Report");
const path = require("path");
const basicHtml = `<div class="sub-div">\n<a href="#"><div class="sub-name">{{structure}}</div></a>\n{{files}}{{dirs}}</div>`;
class SideBar {
    static GenerateSideBar(currentPath) {
        let report = Report_1.Report.GetReport();
        let structure = report.GetStructure();
        let output = report.GetOutput();
        return this.GenerateStructure(structure, output, currentPath);
    }
    static GenerateStructure(structure, outputPath, currentPath) {
        let div = basicHtml.replace("{{structure}}", structure.GetName());
        let files = structure.GetFiles();
        let fileDivs = "";
        for (let file of files) {
            let tests = structure.GetTests(file);
            if (tests.length > 0) {
                let href = path.join(path.relative(path.dirname(currentPath), outputPath), file.replace(path.parse(file).ext, ".html"));
                let fileDiv = `<a href="${href}"><div class="file-div">${file}</div></a>\n`;
                fileDivs += fileDiv;
            }
        }
        let res = div.replace("{{files}}", fileDivs);
        let subDivs = "";
        for (let sub of structure.GetChildren()) {
            if (!sub.HasTests())
                continue;
            let newPath = path.join(outputPath, sub.GetName());
            let subDiv = this.GenerateStructure(sub, newPath, currentPath);
            subDivs += subDiv + "\n";
        }
        return res.replace("{{dirs}}", subDivs);
    }
}
exports.SideBar = SideBar;
