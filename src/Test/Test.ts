import * as assert from "assert";
import { ErrorInfo } from "./ErrorInfo";
import { Report } from "../Report/Report";

export class TestCase {

    private info: ErrorInfo;

    constructor(private name: string) {
        //console.log(process.cwd());
        this.info = null;
    }

    public GetName() {
        return this.name;
    }

    public GetInfo() {
        return this.info;
    }

    public StrictEquals(actual: any, expected: any, message?: string|Error) {
        try {
            assert.strictEqual(actual, expected, message);
        } catch(assertionError) {
            this.info = new ErrorInfo(assertionError);
        }
        this.PrintResult();
    }

    public DeepStrictEquals(actual: any, expected: any, message?: string|Error) {
        try {
            assert.deepStrictEqual(actual, expected, message);
        } catch(assertionError) {
            this.info = new ErrorInfo(assertionError);
        }
        this.PrintResult();
    }

    public async DoesNotReject(block: Function|Promise<any>, message?: string|Error) {
        try {
            await assert.doesNotReject(block, message);
        } catch(assertionError) {
            this.info = new ErrorInfo(assertionError);
        }
        this.PrintResult();
    }

    public DoesNotThrow(block: Function, message?: string|Error) {
        try {
            assert.doesNotThrow(block, message);
        } catch(assertionError) {
            this.info = new ErrorInfo(assertionError);
        }
        this.PrintResult();
    }

    public Fail(message?: string|Error) {
        try {
            assert.fail(message);
        } catch(assertionError) {
            this.info = new ErrorInfo(assertionError);
        }
        this.PrintResult();
    }

    public IfError(value: any) {
        try {
            assert.ifError(value);
        } catch(assertionError) {
            this.info = new ErrorInfo(assertionError);
        }
        this.PrintResult();
    }

    public NotStrictEquals(actual: any, expected: any, message?: string|Error) {
        try {
            assert.notStrictEqual(actual, expected, message);
        } catch(assertionError) {
            this.info = new ErrorInfo(assertionError);
        }
        this.PrintResult();
    }

    public NotDeepStrictEquals(actual: any, expected: any, message?: string|Error) {
        try {
            assert.notDeepStrictEqual(actual, expected, message);
        } catch(assertionError) {
            this.info = new ErrorInfo(assertionError);
        }
        this.PrintResult();
    }

    public True(value: any, message?: string|Error) {
        try {
            assert.ok(value, message);
        } catch(assertionError) {
            this.info = new ErrorInfo(assertionError);
        }
        this.PrintResult();
    }

    public async Rejects(block: Function|Promise<any>, message?: string|Error) {
        try {
            await assert.rejects(block, message);
        } catch(assertionError) {
            this.info = new ErrorInfo(assertionError);
        }
        this.PrintResult();
    }

    public Throws(block: Function, message?: string|Error) {
        try {
            assert.throws(block, message);
        } catch(assertionError) {
            this.info = new ErrorInfo(assertionError);
        }
        this.PrintResult();
    }

    private PrintResult() {
        if(this.info != null) {
            console.error(`${this.name}: ${JSON.stringify(this.info)}`);
        } else {
            console.log(`${this.name}: Test Passed!`);
        }
    }

}

let Test = (testName: string, test: (test: TestCase) => void) => {
    let t = new TestCase(testName);
    test(t);
}

export { Test };