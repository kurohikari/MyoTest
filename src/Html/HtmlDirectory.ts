import { DirStructure } from "../Report/DirStructure";
import { TestSuite } from "../Report/TestSuite";
import { Html } from "../Resources/Resources";
import { SideBar } from "./SideBar";
import * as path from "path";
import * as fs from "fs";

export class HtmlDirectory {

    constructor(private directory: DirStructure) {}

    /**
     * Generates an html string for the directory
     * @param filePath path used for the sidebar
     */
    private GenerateHTML(filePath: string) {
        let suites = "";
        let directories = "";
        let sidebar = SideBar.GenerateSideBar(filePath);
        for(let suite of this.directory.GetTestSuites()) {
            suites += this.GenerateTestSuiteLink(suite);
        }
        for(let child of this.directory.GetChildren()) {
            directories += this.GenerateDirectoryLink(child);
        }
        return Html.directory.replace("{{pagetitle}}", this.directory.GetName())
            .replace("{{sidebar}}", sidebar)
            .replace("{{title}}", this.directory.GetName())
            .replace("{{testsuites}}", suites)
            .replace("{{testdirectories}}", directories);
    }

    /**
     * Generates an <a> tag for a test suite
     * @param suite test suite to link to
     */
    private GenerateTestSuiteLink(suite: TestSuite) {
        let htmlLink = `./${suite.GetFileName().replace(path.parse(suite.GetFileName()).ext, ".html")}`;
        return `<a href="${htmlLink}"><div class="test-suite">${suite.GetFileName()}<div>${suite.GetPassCount()} <span class="good-fisheye">&#9673;</span> ${suite.GetFailCount()} <span class="fail-mark">&#10007;</span></div></div></a>\n`;
    }

    /**
     * Generates an <a> tag for a test directory
     * @param dir directory to link to
     */
    private GenerateDirectoryLink(dir: DirStructure) {
        let htmlLink = `./${dir.GetName()}/dir_${dir.GetName()}.html`;
        return `<a href="${htmlLink}"><div class="directory">${dir.GetName()}<div>${dir.GetTotalPasses()} <span class="good-fisheye">&#9673;</span> ${dir.GetTotalFails()} <span class="fail-mark">&#10007;</span></div></div></a>\n`;
    }

    /**
     * Saves the directory as an html file at the corresponding path
     * @param filePath path to save to
     */
    public SaveAsHTML(filePath: string) {
        let fPath = path.join(filePath, `dir_${this.directory.GetName()}.html`);
        let toWrite = this.GenerateHTML(fPath);
        let stream = fs.createWriteStream(fPath);
        stream.write(toWrite, (error) => {
            if(error) {
                console.error(`Could not write ${name}`);
                console.error(error);
            } else stream.close();
        });
    }

}