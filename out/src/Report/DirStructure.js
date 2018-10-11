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
    /**
     * Get the name of the directory
     */
    GetName() {
        return this.name;
    }
    /**
     * Get the files of the directory
     */
    GetFiles() {
        return Object.keys(this.files);
    }
    /**
     * Add a test result in the directory
     * @param test the test to add
     */
    AddTest(test) {
        let testFile = path.basename(test.GetPath());
        this.AddFile(testFile);
        this.files[testFile].push(test);
    }
    /**
     * Get the tests in the directory for the given file
     * @param file the file tested
     */
    GetTests(file) {
        if (!this.HasFile(file))
            return null;
        return this.files[file];
    }
    /**
     * Get the list of child directories
     */
    GetChildren() {
        return this.children;
    }
    /**
     * Add a file to the directory
     * @param file the name of the file to add
     */
    AddFile(file) {
        if (this.HasFile(file))
            return false;
        this.files[file] = [];
        return true;
    }
    /**
     * Check if the directory or any of its subdirectories contains tests
     */
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
    /**
     * Returns true if the directory has been declared as root
     */
    IsRoot() {
        return this.root;
    }
    /**
     * Add a child directory to the current directory
     * @param child child directory to add
     */
    AddChild(child) {
        if (this.HasChild(child))
            return false;
        this.children.push(child);
        return true;
    }
    /**
     * Checks if the directory contains a file with the given name
     * @param file name of the file
     */
    HasFile(file) {
        return (Object.keys(this.files).indexOf(file) > -1);
    }
    /**
     * Checks if the directory has a child directory by comparing their names
     * @param child child directory which's name to check for
     */
    HasChild(child) {
        for (let c of this.children) {
            if (c.GetName() === child.GetName()) {
                return true;
            }
        }
        return false;
    }
    /**
     * Return the child directory with the given name
     * @param childName  name of the child directory
     */
    GetChild(childName) {
        for (let c of this.children) {
            if (c.GetName() === childName) {
                return c;
            }
        }
        throw new Error(`Structure does not have child ${childName}!`);
    }
    /**
     * Returns true when the given file didn't generate any error
     * @param file name of the file
     */
    HasNoErrors(file) {
        if (!this.HasFile(file))
            throw new Error(`No such file in directory: ${file}`);
        let tests = this.GetTests(file);
        for (let test of tests) {
            if (!test.IsPassed())
                return false;
        }
        return true;
    }
    /**
     * Prints the structure from the current directory
     * TODO: return a string
     */
    toString() {
        this.toStringify(0, this);
    }
    /**
     * Used to recursively print directory and subdirectory content
     * @param indentLevel
     * @param dir
     */
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
