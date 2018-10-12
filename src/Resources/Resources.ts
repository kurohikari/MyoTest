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
const Html = {
    suite: fs.readFileSync(path.join(resourcesFolderPath, "html_suite.html")).toString()
}

const Directory = {
    base: fs.readFileSync(path.join(resourcesFolderPath, "html_directory.html")).toString(),
    dirLink: fs.readFileSync(path.join(resourcesFolderPath, "html_dir_link.html")).toString(),
    suiteLink: fs.readFileSync(path.join(resourcesFolderPath, "html_suite_link.html")).toString()
}

export { Js, Css, Html, Directory }