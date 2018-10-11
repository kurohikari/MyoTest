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

const Css: string = fs.readFileSync(path.join(resourcesFolderPath, "myo-css.css")).toString();

export { Css };