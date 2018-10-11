import { TestResult } from "./TestResult";
import * as path from "path";

export class DirStructure {

    private name: string;
    private root: boolean;
    private files: {[file: string]: TestResult[]};
    private children: DirStructure[];

    constructor(name: string, root: boolean = false) {
        this.name = name;
        this.root = root;
        this.files = {};
        this.children = [];
    }
    
    /**
     * Get the name of the directory
     */
    public GetName() {
        return this.name;
    }

    /**
     * Get the files of the directory
     */
    public GetFiles() {
        return Object.keys(this.files);
    }

    /**
     * Add a test result in the directory
     * @param test the test to add
     */
    public AddTest(test: TestResult) {
        let testFile = path.basename(test.GetPath());
        this.AddFile(testFile);
        this.files[testFile].push(test);
    }

    /**
     * Get the tests in the directory for the given file
     * @param file the file tested
     */
    public GetTests(file: string) {
        if(!this.HasFile(file)) return null;
        return this.files[file];
    }

    /**
     * Get the list of child directories
     */
    public GetChildren() {
        return this.children;
    }

    /**
     * Add a file to the directory
     * @param file the name of the file to add
     */
    public AddFile(file: string) {
        if(this.HasFile(file)) return false;
        this.files[file] = [];
        return true;
    }

    /**
     * Check if the directory or any of its subdirectories contains tests
     */
    public HasTests() {
        for(let file of Object.keys(this.files)) {
            if(this.files[file].length > 0) return true;
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
     * Checks if the directory contains a file with the given name
     * @param file name of the file
     */
    public HasFile(file: string) {
        return (Object.keys(this.files).indexOf(file) > -1);
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
     * Returns true when the given file didn't generate any error
     * @param file name of the file
     */
    public HasNoErrors(file: string) {
        if(!this.HasFile(file)) throw new Error(`No such file in directory: ${file}`);
        let tests = this.GetTests(file);
        for(let test of tests) {
            if(!test.IsPassed()) return false;
        }
        return true;
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
        let files = dir.GetFiles();
        for(let file of Object.keys(files)) {
            let tests = files[file]
            let testsStr = "";
            for(let test of tests) {
                testsStr += `<${test.GetTestName()}> `;
            }
            console.log(`${indents}"${file}" - ${testsStr}`);
        }
        for(let subDir of dir.GetChildren()) {
            this.toStringify(indentLevel+1, subDir);
        }
    }

}