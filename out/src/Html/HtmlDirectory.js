"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../Resources/Resources");
const SideBar_1 = require("./SideBar");
const path = require("path");
const fs = require("fs");
class HtmlDirectory {
    constructor(directory) {
        this.directory = directory;
    }
    /**
     * Generates an html string for the directory
     * @param filePath path used for the sidebar
     */
    GenerateHTML(filePath) {
        let suites = "";
        let directories = "";
        let sidebar = SideBar_1.SideBar.GenerateSideBar(filePath);
        for (let suite of this.directory.GetTestSuites()) {
            suites += this.GenerateTestSuiteLink(suite);
        }
        for (let child of this.directory.GetChildren()) {
            directories += this.GenerateDirectoryLink(child);
        }
        return Resources_1.Directory.base.replace("{{pagetitle}}", this.directory.GetName())
            .replace("{{sidebar}}", sidebar)
            .replace("{{title}}", this.directory.GetName())
            .replace("{{testsuites}}", suites)
            .replace("{{testdirectories}}", directories);
    }
    /**
     * Generates an <a> tag for a test suite
     * @param suite test suite to link to
     */
    GenerateTestSuiteLink(suite) {
        let htmlLink = `./${suite.GetFile().replace(path.parse(suite.GetFile()).ext, ".html")}`;
        return Resources_1.Directory.suiteLink.replace("{{htmllink}}", htmlLink)
            .replace("{{name}}", suite.GetFile())
            .replace("{{passes}}", `${suite.PassCount()}`)
            .replace("{{fails}}", `${suite.FailCount()}`);
    }
    /**
     * Generates an <a> tag for a test directory
     * @param dir directory to link to
     */
    GenerateDirectoryLink(dir) {
        let htmlLink = `./${dir.GetName()}/dir_${dir.GetName()}.html`;
        return Resources_1.Directory.dirLink.replace("{{htmllink}}", htmlLink)
            .replace("{{name}}", dir.GetName())
            .replace("{{numpasses}}", `${dir.GetTotalPasses()}`)
            .replace("{{numfails}}", `${dir.GetTotalFails()}`);
    }
    /**
     * Saves the directory as an html file at the corresponding path
     * @param filePath path to save to
     */
    SaveAsHTML(filePath) {
        let fPath = path.join(filePath, `dir_${this.directory.GetName()}.html`);
        let toWrite = this.GenerateHTML(fPath);
        let stream = fs.createWriteStream(fPath);
        stream.write(toWrite, (error) => {
            if (error) {
                console.error(`Could not write ${name}`);
                console.error(error);
            }
            else
                stream.close();
        });
    }
}
exports.HtmlDirectory = HtmlDirectory;
