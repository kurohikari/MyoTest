"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class DirStructure {
    constructor(name, root = false) {
        this.name = name;
        this.root = root;
        this.children = [];
        this.suites = [];
    }
    /**
     * Adds a test suite to the directory
     * @param suite
     */
    AddSuite(suite) {
        this.suites.push(suite);
    }
    /**
     * Get the total number of passes from test suites of this directory and its children
     */
    GetTotalPasses() {
        let tot = 0;
        for (let suite of this.suites) {
            for (let testcase of suite.TestCases()) {
                if (!testcase.WasFailed()) {
                    tot++;
                }
            }
        }
        for (let child of this.children) {
            tot += child.GetTotalPasses();
        }
        return tot;
    }
    /**
     * Get the total number of passes from test suites of this directory and its children
     */
    GetTotalFails() {
        let tot = 0;
        for (let suite of this.suites) {
            for (let testcase of suite.TestCases()) {
                if (testcase.WasFailed()) {
                    tot++;
                }
            }
        }
        for (let child of this.children) {
            tot += child.GetTotalFails();
        }
        return tot;
    }
    /**
     * Get the test suite in the current directory
     */
    GetTestSuites() {
        return this.suites;
    }
    /**
     * Get the name of the directory
     */
    GetName() {
        return this.name;
    }
    /**
     * Get the list of child directories
     */
    GetChildren() {
        return this.children;
    }
    /**
     * Check if the directory or any of its subdirectories contains tests
     */
    HasTests() {
        for (let suite of this.suites) {
            if (suite.TestCases().length > 0)
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
     * Returns true when the directory has a child with the given name
     * @param childName name to look for
     */
    HasChildWithName(childName) {
        for (let child of this.children) {
            if (child.GetName() === childName)
                return true;
        }
        return false;
    }
    /**
     * Returns true when the directory has a descendant with the given name
     * @param descendantName name to look for
     */
    HasDescendantWithName(descendantName) {
        for (let child of this.children) {
            if (child.HasChildWithName(descendantName) || child.HasDescendantWithName(descendantName))
                return true;
        }
        return false;
    }
    /**
     * Returns the path to the descendant name given
     * @param descendantName name to look for
     */
    FindPathToDescendant(descendantName) {
        if (this.HasChildWithName(descendantName))
            return this.name;
        else if (this.HasDescendantWithName(descendantName)) {
            for (let child of this.children) {
                if (child.HasDescendantWithName(descendantName)) {
                    return path.join(this.name, child.FindPathToDescendant(descendantName));
                }
            }
        }
        throw new Error(`Directory does not have a descendant with name: ${descendantName}!`);
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
     * Cleans the directory by removing empty test suites and directories
     * @param recursive when set to true (default), this will also clean the child directories
     */
    Clean(recursive = true) {
        let newSuites = [];
        let newChildren = [];
        for (let suite of this.suites) {
            if (suite.TestCases().length > 0) {
                newSuites.push(suite);
            }
        }
        for (let child of this.children) {
            if (child.HasTests()) {
                if (recursive)
                    child.Clean();
                newChildren.push(child);
            }
        }
        this.suites = newSuites;
        this.children = newChildren;
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
        for (let suite of dir.GetTestSuites()) {
            let testsStr = "";
            for (let test of suite.TestCases()) {
                testsStr += `<${test.GetName()}> `;
            }
            console.log(`${indents}"${suite.GetFile()}" - ${testsStr}`);
        }
        for (let subDir of dir.GetChildren()) {
            this.toStringify(indentLevel + 1, subDir);
        }
    }
}
exports.DirStructure = DirStructure;
