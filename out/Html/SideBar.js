"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Report_1 = require("../Report/Report");
const path = require("path");
const DirStructure_1 = require("./DirStructure");
class SideBar {
    SideBar() {
    }
    static GetSideBar() {
        let report = Report_1.Report.GetReport();
        let tests = report.GetTests();
        let files = Object.keys(tests);
        let structure = new DirStructure_1.DirStructure("root");
        let originalStructure = structure;
        for (let file of files) {
            let test = tests[file][0];
            let testPath = test.GetPath();
            console.log(testPath);
            let source = path.normalize(report.GetSource());
            let sourcesDirsLength = (source.split("/").length > 1) ? source.split("/").length : source.split("\\").length;
            let pathDirs = testPath.split("\\");
            console.log(sourcesDirsLength);
            for (let i = 0; i < sourcesDirsLength; i++)
                pathDirs.shift();
            console.log(pathDirs);
            let start = null;
            let struct = null;
            for (let i = 0; i < pathDirs.length - 1; i++) {
                if (struct === null) {
                    struct = new DirStructure_1.DirStructure(pathDirs[i]);
                    start = struct;
                }
                else {
                    let newDir = new DirStructure_1.DirStructure(pathDirs[i]);
                    struct.AddChild(newDir);
                    struct = newDir;
                }
            }
            if (struct !== null)
                struct.AddFile(pathDirs[pathDirs.length - 1]);
            console.log(start);
            if (start === null) {
                structure.AddFile(pathDirs[pathDirs.length - 1]);
            }
            else {
                struct.AddFile(pathDirs[pathDirs.length - 1]);
                let added = false;
                while (start.GetChildren().length > 0) {
                    if (!structure.AddChild(start)) {
                        structure = structure.GetChild(start.GetName());
                        start = start.GetChild(start.GetName());
                    }
                    else {
                        structure = originalStructure;
                        added = true;
                        break;
                    }
                }
                if (!added) {
                    structure.AddFile(pathDirs[pathDirs.length - 1]);
                    structure = originalStructure;
                }
            }
        }
        console.log(structure);
    }
}
exports.SideBar = SideBar;
