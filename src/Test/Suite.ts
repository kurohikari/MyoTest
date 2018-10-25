import * as path from "path";
import { TestCase } from "./TestCase";

let suites: Suite[] = [];

export class Suite {

    private file: string;
    private path: string;
    private testCases: TestCase[];

    private constructor(filepath: string) {
        this.path = filepath;
        this.file = path.parse(filepath).base;
        this.testCases = [];
    }

    public static Get(filepath: string): Suite {
        let suite = new Suite(filepath);
        let found = false;
        for(let s of suites) {
            if(s.GetPath() === filepath) {
                suite = s;
                found = true;
                break;
            }
        }
        if(!found) {
            suites.push(suite);
        }
        return suite;
    }

    public static GetAll(): Suite[] {
        return suites;
    }

    public AddTestCase(testCase: TestCase): void {
        this.testCases.push(testCase);
    }

    public GetFile(): string {
        return this.file;
    }

    public GetPath(): string {
        return this.path;
    }

    /**
     * Returns the test cases in the test suite
     */
    public TestCases(): TestCase[] {
        return this.testCases;
    }

}