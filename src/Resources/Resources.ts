import * as path from "path";
import * as fs from "fs";

function FindResources(searchPath: string) {
    let reads = fs.readdirSync(searchPath);
    for(let read of reads) {
        if(read === "resources") {
            let resourcesPath = path.join(searchPath, read);
            if(fs.statSync(resourcesPath).isDirectory()) {
                return resourcesPath;
            }
        }
    }
    let newPath = path.join(searchPath, "..");
    return FindResources(newPath);
}

let resourcesFolderPath = FindResources(`${__dirname}`);

const Js: string = fs.readFileSync(path.join(resourcesFolderPath, "myo-js.js")).toString();
const Css: string = fs.readFileSync(path.join(resourcesFolderPath, "myo-css.css")).toString();

const Directory = {
    base: fs.readFileSync(path.join(resourcesFolderPath, "html_directory.html")).toString(),
    dirLink: fs.readFileSync(path.join(resourcesFolderPath, "html_dir_link.html")).toString(),
    suiteLink: fs.readFileSync(path.join(resourcesFolderPath, "html_suite_link.html")).toString()
}

const Suite = {
    base: fs.readFileSync(path.join(resourcesFolderPath, "html_suite.html")).toString(),
    okTest: fs.readFileSync(path.join(resourcesFolderPath, "html_ok_test.html")).toString(),
    okLine: fs.readFileSync(path.join(resourcesFolderPath, "html_ok_line.html")).toString(),
    koTest: fs.readFileSync(path.join(resourcesFolderPath, "html_ko_test.html")).toString(),
    koLine: fs.readFileSync(path.join(resourcesFolderPath, "html_ko_line.html")).toString(),
    titleLink: fs.readFileSync(path.join(resourcesFolderPath, "html_title_link.html")).toString(),
    analysis: fs.readFileSync(path.join(resourcesFolderPath, "html_suite_analysis.html")).toString()
}

const Test = {
    base: fs.readFileSync(path.join(resourcesFolderPath, "html_test.html")).toString(),
    analysis: fs.readFileSync(path.join(resourcesFolderPath, "html_test_analysis.html")).toString()
}

export { Js, Css, Directory, Suite, Test }