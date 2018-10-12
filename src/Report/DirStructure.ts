import { TestResult } from "./TestResult";
import { TestSuite } from "./TestSuite";
import * as path from "path";

export class DirStructure {

    private name: string;
    private root: boolean;
    private testSuites: TestSuite[];
    private children: DirStructure[];

    constructor(name: string, root: boolean = false) {
        this.name = name;
        this.root = root;
        this.children = [];
        this.testSuites = [];
    }

    /**
     * Adds a test suite to the report
     * @param testSuite test suite to add
     * @param mergeIfExist default to true. Adds merge test results to existing test suite when there is already one for the same file. Do nothing when it is false.
     */
    public AddTestSuite(testSuite: TestSuite, mergeIfExist = true) {
        if(this.HasTestSuite(testSuite) && !mergeIfExist) return false;
        else if(this.HasTestSuite(testSuite) && mergeIfExist) {
            for(let suite of this.testSuites) {
                if(suite.GetFileName() === testSuite.GetFileName()) {
                    testSuite.MergeInto(suite);
                    break;
                }
            }
        } else {
            this.testSuites.push(testSuite);
        }
    }

    /**
     * Returns true when the report contains a test suite for the same file as the one passed
     * @param testSuite test suite to check
     */
    public HasTestSuite(testSuite: TestSuite) {
        for(let suite of this.testSuites) {
            if(suite.GetFileName() === testSuite.GetFileName()) {
                return true;
            }
        }
        return false;
    }

    /**
     * Returns true when the directory has a test suite with the given filename
     * @param file filename to check
     */
    public HasTestSuiteForFile(file: string) {
        for(let suite of this.testSuites) {
            if(suite.GetFileName() === file) return true;
        }
        return false;
    }

    /**
     * Get the test suite in the current directory
     */
    public GetTestSuites() {
        return this.testSuites;
    }
    
    /**
     * Get the name of the directory
     */
    public GetName() {
        return this.name;
    }

    /**
     * Get the list of child directories
     */
    public GetChildren() {
        return this.children;
    }

    /**
     * Check if the directory or any of its subdirectories contains tests
     */
    public HasTests() {
        for(let suite of this.testSuites) {
            if(suite.HasTests()) return true;
        }
        for(let child of this.children) {
            if(child.HasTests()) return true;
        }
        return false;
    }

    /**
     * Returns true if the directory has been declared as root
     */
    public IsRoot() {
        return this.root;
    }

    /**
     * Add a child directory to the current directory
     * @param child child directory to add
     */
    public AddChild(child: DirStructure) {
        if(this.HasChild(child)) return false;
        this.children.push(child);
        return true;
    }

    /**
     * Checks if the directory has a child directory by comparing their names
     * @param child child directory which's name to check for
     */
    public HasChild(child: DirStructure) {
        for(let c of this.children) {
            if(c.GetName() === child.GetName()) {
                return true;
            }
        }
        return false;
    }

    /**
     * Return the child directory with the given name
     * @param childName  name of the child directory
     */
    public GetChild(childName: string) {
        for(let c of this.children) {
            if(c.GetName() === childName) {
                return c;
            }
        }
        throw new Error(`Structure does not have child ${childName}!`);
    }

    /**
     * Cleans the directory by removing empty test suites and directories
     * @param recursive when set to true (default), this will also clean the child directories
     */
    public Clean(recursive = true) {
        let newSuites: TestSuite[] = [];
        let newChildren : DirStructure[] = [];
        for(let suite of this.testSuites) {
            if(suite.HasTests()) {
                newSuites.push(suite);
            }
        }
        for(let child of this.children) {
            if(child.HasTests()) {
                if(recursive) child.Clean();
                newChildren.push(child);
            }
        }
        this.testSuites = newSuites;
        this.children = newChildren;
    }

    /**
     * Prints the structure from the current directory
     * TODO: return a string
     */
    public toString() {
        this.toStringify(0, this);
    }

    /**
     * Used to recursively print directory and subdirectory content
     * @param indentLevel 
     * @param dir 
     */
    private toStringify(indentLevel: number, dir: DirStructure) {
        let indents = "";
        for(let i=0;i<indentLevel; i++) {
            indents += "\t";
        }
        console.log(`${indents}[${dir.GetName()}]`);
        indents += "\t";
        for(let suite of dir.GetTestSuites()) {
            let testsStr = "";
            for(let test of suite.GetTests()) {
                testsStr += `<${test.GetTestName()}> `;
            }
            console.log(`${indents}"${suite.GetFileName()}" - ${testsStr}`);
        }
        for(let subDir of dir.GetChildren()) {
            this.toStringify(indentLevel+1, subDir);
        }
    }

}