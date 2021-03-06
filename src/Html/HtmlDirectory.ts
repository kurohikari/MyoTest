import { DirStructure } from "../Report/DirStructure";
import { Directory } from "../Resources/Resources";
import { Suite } from "../Test/Suite";
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
        return Directory.base.replace("{{pagetitle}}", this.directory.GetName())
            .replace("{{sidebar}}", sidebar)
            .replace("{{title}}", this.directory.GetName())
            .replace("{{testsuites}}", suites)
            .replace("{{testdirectories}}", directories);
    }

    /**
     * Generates an <a> tag for a test suite
     * @param suite test suite to link to
     */
    private GenerateTestSuiteLink(suite: Suite) {
        let htmlLink = `./${suite.GetFile().replace(path.parse(suite.GetFile()).ext, ".html")}`;
        return Directory.suiteLink.replace("{{htmllink}}", htmlLink)
            .replace("{{name}}", suite.GetFile())
            .replace("{{passes}}", `${suite.PassCount()}`)
            .replace("{{fails}}", `${suite.FailCount()}`);
    }

    /**
     * Generates an <a> tag for a test directory
     * @param dir directory to link to
     */
    private GenerateDirectoryLink(dir: DirStructure) {
        let htmlLink = `./${dir.GetName()}/dir_${dir.GetName()}.html`;
        return Directory.dirLink.replace("{{htmllink}}", htmlLink)
            .replace("{{name}}", dir.GetName())
            .replace("{{numpasses}}", `${dir.GetTotalPasses()}`)
            .replace("{{numfails}}", `${dir.GetTotalFails()}`);
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