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
    
    public GetName() {
        return this.name;
    }

    public GetFiles() {
        return this.files;
    }

    public AddTest(test: TestResult) {
        let testFile = path.basename(test.GetPath());
        this.AddFile(testFile);
        this.files[testFile].push(test);
    }

    public GetTests(file: string) {
        if(!this.HasFile(file)) return null;
        return this.files[file];
    }

    public GetChildren() {
        return this.children;
    }

    public AddFile(file: string) {
        if(this.HasFile(file)) return false;
        this.files[file] = [];
        return true;
    }

    public HasTests() {
        for(let file of Object.keys(this.files)) {
            if(this.files[file].length > 0) return true;
        }
        for(let child of this.children) {
            if(child.HasTests()) return true;
        }
        return false;
    }

    public IsRoot() {
        return this.root;
    }

    public AddChild(child: DirStructure) {
        if(this.HasChild(child)) return false;
        this.children.push(child);
        return true;
    }

    public HasFile(file: string) {
        return (Object.keys(this.files).indexOf(file) > -1);
    }

    public HasChild(child: DirStructure) {
        for(let c of this.children) {
            if(c.GetName() === child.GetName()) {
                return true;
            }
        }
        return false;
    }

    public GetChild(childName: string) {
        for(let c of this.children) {
            if(c.GetName() === childName) {
                return c;
            }
        }
        throw new Error(`Structure does not have child ${childName}!`);
    }

    public toString() {
        this.toStringify(0, this);
    }

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