"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
function FindResources(searchPath) {
    let reads = fs.readdirSync(searchPath);
    for (let read of reads) {
        if (read === "resources") {
            let resourcesPath = path.join(searchPath, read);
            if (fs.statSync(resourcesPath).isDirectory()) {
                return resourcesPath;
            }
        }
    }
    let newPath = path.join(searchPath, "..");
    return FindResources(newPath);
}
let resourcesFolderPath = FindResources(`${__dirname}`);
const Js = fs.readFileSync(path.join(resourcesFolderPath, "myo-js.js")).toString();
exports.Js = Js;
const Css = fs.readFileSync(path.join(resourcesFolderPath, "myo-css.css")).toString();
exports.Css = Css;
const Html = {
    suite: fs.readFileSync(path.join(resourcesFolderPath, "html_suite.html")).toString()
};
exports.Html = Html;
const Directory = {
    base: fs.readFileSync(path.join(resourcesFolderPath, "html_directory.html")).toString(),
    dirLink: fs.readFileSync(path.join(resourcesFolderPath, "html_dir_link.html")).toString(),
    suiteLink: fs.readFileSync(path.join(resourcesFolderPath, "html_suite_link.html")).toString()
};
exports.Directory = Directory;
