"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class DirStructure {
    constructor(name, root = false) {
        this.name = name;
        this.root = root;
        this.files = {};
        this.children = [];
    }
    GetName() {
        return this.name;
    }
    GetFiles() {
        return Object.keys(this.files);
    }
    AddTest(test) {
        let testFile = path.basename(test.GetPath());
        this.AddFile(testFile);
        this.files[testFile].push(test);
    }
    GetTests(file) {
        if (!this.HasFile(file))
            return null;
        return this.files[file];
    }
    GetChildren() {
        return this.children;
    }
    AddFile(file) {
        if (this.HasFile(file))
            return false;
        this.files[file] = [];
        return true;
    }
    HasTests() {
        for (let file of Object.keys(this.files)) {
            if (this.files[file].length > 0)
                return true;
        }
        for (let child of this.children) {
            if (child.HasTests())
                return true;
        }
        return false;
    }
    IsRoot() {
        return this.root;
    }
    AddChild(child) {
        if (this.HasChild(child))
            return false;
        this.children.push(child);
        return true;
    }
    HasFile(file) {
        return (Object.keys(this.files).indexOf(file) > -1);
    }
    HasChild(child) {
        for (let c of this.children) {
            if (c.GetName() === child.GetName()) {
                return true;
            }
        }
        return false;
    }
    GetChild(childName) {
        for (let c of this.children) {
            if (c.GetName() === childName) {
                return c;
            }
        }
        throw new Error(`Structure does not have child ${childName}!`);
    }
    toString() {
        this.toStringify(0, this);
    }
    toStringify(indentLevel, dir) {
        let indents = "";
        for (let i = 0; i < indentLevel; i++) {
            indents += "\t";
        }
        console.log(`${indents}[${dir.GetName()}]`);
        indents += "\t";
        let files = dir.GetFiles();
        for (let file of Object.keys(files)) {
            let tests = files[file];
            let testsStr = "";
            for (let test of tests) {
                testsStr += `<${test.GetTestName()}> `;
            }
            console.log(`${indents}"${file}" - ${testsStr}`);
        }
        for (let subDir of dir.GetChildren()) {
            this.toStringify(indentLevel + 1, subDir);
        }
    }
}
exports.DirStructure = DirStructure;
