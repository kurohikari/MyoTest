import { Report } from "../Report/Report";
import { DirStructure } from "../Report/DirStructure";

const basicHtml = `<div class="sub-div">\n<a href="#"><div class="sub-name">{{structure}}</div></a>\n{{files}}{{dirs}}</div>`;

export class SideBar {

    public static GenerateSideBar() {
        let structure = Report.GetReport().GetStructure();
        return this.GenerateStructure(structure);
    }

    private static GenerateStructure(structure: DirStructure) {
        let div = basicHtml.replace("{{structure}}", structure.GetName());
        let files = structure.GetFiles();
        let fileDivs = "";
        for(let file of files) {
            let tests = structure.GetTests(file);
            if(tests.length > 0) {
                let fileDiv = `<a href="#"><div class="file-div">${file}</div></a>\n`;
                fileDivs += fileDiv;
            }
        }
        let res = div.replace("{{files}}", fileDivs);
        let subDivs = "";
        for(let sub of structure.GetChildren()) {
            if(!sub.HasTests()) continue;
            let subDiv = this.GenerateStructure(sub);
            subDivs += subDiv + "\n";
        }
        return res.replace("{{dirs}}", subDivs);
    }

}