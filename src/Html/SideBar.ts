import { Report } from "../Report/Report";
import { DirStructure } from "../Report/DirStructure";
import * as path from "path";

/**
 * base html to use to create the sidebar
 */
const basicHtml = `<div class="sub-div">\n<a href="#"><div class="sub-name">{{structure}}</div></a>\n{{files}}{{dirs}}</div>`;

/**
 * base html to add check mark next to a test suite with no failures
 */
const sideCheckMark = `<span class="check-mark">&#10003;</span>`


/**
 * base html to add a fail mark next to a test suite with at least one failure
 */
const sideFailMark = `<span class="fail-mark">&#10007;</span>`;

export class SideBar {

    /**
     * Returns an html string containing the sidebar html content
     * @param currentPath path use for creating relative references to other tests
     */
    public static GenerateSideBar(currentPath: string) {
        let report = Report.GetReport();
        let structure = report.GetStructure();
        let output = report.GetOutput();
        return this.GenerateStructure(structure, output, currentPath);
    }

    /**
     * Recursively generates the sidebar html content to reflect the test structure
     * @param structure structure to follow
     * @param outputPath path to file output
     * @param currentPath current path of the file using the sidebar
     */
    private static GenerateStructure(structure: DirStructure, outputPath: string, currentPath: string) {
        let div = basicHtml.replace("{{structure}}", structure.GetName());
        let files = structure.GetFiles();
        let fileDivs = "";
        for(let file of files) {
            let tests = structure.GetTests(file);
            if(tests.length > 0) {
                let href = path.join(path.relative(path.dirname(currentPath), outputPath), file.replace(path.parse(file).ext, ".html"));
                let mark = (structure.HasNoErrors(file)) ? sideCheckMark : sideFailMark;
                let fileDiv = `<a href="${href}"><div class="file-div">${file} ${mark}</div></a>\n`;
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