"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Report_1 = require("../Report/Report");
const basicHtml = `<div class="sub-div">\n<a href="#"><div class="sub-name">{{structure}}</div></a>\n{{files}}{{dirs}}</div>`;
class SideBar {
    static GenerateSideBar() {
        let structure = Report_1.Report.GetReport().GetStructure();
        return this.GenerateStructure(structure);
    }
    static GenerateStructure(structure) {
        let div = basicHtml.replace("{{structure}}", structure.GetName());
        let files = structure.GetFiles();
        let fileDivs = "";
        for (let file of Object.keys(files)) {
            let tests = files[file];
            if (tests.length > 0) {
                let fileDiv = `<a href="#"><div class="file-div">${file}</div></a>\n`;
                fileDivs += fileDiv;
            }
        }
        let res = div.replace("{{files}}", fileDivs);
        let subDivs = "";
        for (let sub of structure.GetChildren()) {
            let subDiv = this.GenerateStructure(sub);
            subDivs += subDiv + "\n";
        }
        return res.replace("{{dirs}}", subDivs);
    }
}
exports.SideBar = SideBar;
