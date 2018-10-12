import { DirStructure } from "./DirStructure";
import { TestSuite } from "./TestSuite";
import * as path from "path";

export class HtmlDirectory {

    constructor(private directory: DirStructure) {}

    private GenerateHTML() {

    }

    private GenerateTestSuiteLink(suite: TestSuite) {
        let htmlLink = `./${suite.GetFileName().replace(path.parse(suite.GetFileName()).ext, ".html")}`;
        return `<a href="${htmlLink}"><div class="test-suite">${suite.GetFileName()}</div></a>`;
    }

    private GenerateDirectoryLink(dir: DirStructure) {
        let htmlLink = `./${dir.GetName()}/dir_${dir.GetName()}.html`;
        return `<a href="${htmlLink}"><div class="directory">${dir.GetName()}</div></a>`;
    }

}