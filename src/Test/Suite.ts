import * as path from "path";
import { TestCase } from "./TestCase";

let suites: Suite[] = [];

export class Suite {

    private file: string;
    private path: string;
    private testCases: TestCase[];
    private setupFunction: () => void;
    private teardownFunction: () => void;
    private testFuncs: ((test: TestCase) => void)[];

    private constructor(filepath: string) {
        this.path = filepath;
        this.file = path.parse(filepath).base;
        this.testCases = [];
        this.testFuncs = [];
        this.setupFunction = null;
        this.teardownFunction = null;
    }

    /**
     * Returns a test suite for the given file path
     * @param filepath 
     */
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

    /**
     * Get all available test suites
     */
    public static GetAll(): Suite[] {
        return suites;
    }

    /**
     * adds a testcase with its test function
     * @param testCase 
     * @param testFunc 
     */
    public AddTestCase(testCase: TestCase, testFunc: (test: TestCase) => void = null): void {
        this.testCases.push(testCase);
        this.testFuncs.push(testFunc);
    }

    /**
     * Runs all the test cases in the test suite
     */
    public async RunTests(): Promise<void> {
        for(let i = 0; i<this.testFuncs.length; i++) {
            let test = this.testCases[i];
            let testFunc = this.testFuncs[i];
            try {
                await testFunc(test);
            } catch(error) {
                test.SetError(error);
            }
        }
    }

    /**
     * removes all the test functions (used before passing to myotest)
     */
    public ClearTests(): void {
        this.testFuncs = [];
    }

    /**
     * Returns the filenane of the test suite
     */
    public GetFile(): string {
        return this.file;
    }

    /**
     * Returns the path of the test suite
     */
    public GetPath(): string {
        return this.path;
    }

    /**
     * Returns the test cases in the test suite
     */
    public TestCases(): TestCase[] {
        return this.testCases;
    }

    /**
     * Sets the setup function of the test suite
     * @param setup 
     */
    public SetOnSetup(setup: () => void) {
        this.setupFunction = setup;
    }

    /**
     * Runs the setup function
     */
    public async Setup(): Promise<void> {
        if(this.setupFunction !== null) {
            await this.setupFunction();
        }
    }

    /**
     * Sets the teardown function of the test suite
     * @param teardown 
     */
    public SetOnTeardown(teardown: () => void){
        this.teardownFunction = teardown;
    }

    /**
     * Runs the teardown function
     */
    public async Teardown(): Promise<void> {
        if(this.teardownFunction !== null){
            await this.teardownFunction();
        }
    }

    /**
     * Checks if any testcase has a test in the testsuite
     */
    public HasTests(): boolean {
        for(let testcase of this.testCases) {
            if(testcase.GetSuccessLines().length > 0 || testcase.WasFailed()) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks if no testcase was failed
     */
    public IsClean(): boolean {
        for(let testcase of this.testCases) {
            if(testcase.WasFailed()) return false;
        }
        return true;
    }

    /**
     * Returns the number of testcases passed
     */
    public PassCount(): number {
        let count = 0;
        for(let testcase of this.testCases) {
            if(!testcase.WasFailed()) count++;
        }
        return count;
    }

    /**
     * Returns the number of testcases failed
     */
    public FailCount(): number {
        let count = 0;
        for(let testcase of this.testCases) {
            if(testcase.WasFailed()) count++;
        }
        return count;
    }

    /**
     * Creates a Suite from a JSON object
     * @param object 
     */
    public static FromObject(object: any): Suite {
        let suite = new Suite(object.path);
        for(let testcase of object.testCases) {
            let testCase = TestCase.FromObject(testcase);
            suite.AddTestCase(testCase);
        }
        suites.push(suite);
        return suite;
    }

}