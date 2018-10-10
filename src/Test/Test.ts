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
            this.FailTest();
        }
    }

    public DeepStrictEquals(actual: any, expected: any, message?: string|Error) {
        try {
            assert.deepStrictEqual(actual, expected, message);
        } catch(assertionError) {
            this.info = new ErrorInfo(assertionError);
            this.FailTest();
        }
    }

    public async DoesNotReject(block: Function|Promise<any>, message?: string|Error) {
        try {
            await assert.doesNotReject(block, message);
        } catch(assertionError) {
            this.info = new ErrorInfo(assertionError);
            this.FailTest();
        }
    }

    public DoesNotThrow(block: Function, message?: string|Error) {
        try {
            assert.doesNotThrow(block, message);
        } catch(assertionError) {
            this.info = new ErrorInfo(assertionError);
            this.FailTest();
        }
    }

    public Fail(message?: string|Error) {
        try {
            assert.fail(message);
        } catch(assertionError) {
            this.info = new ErrorInfo(assertionError);
            this.FailTest();
        }
    }

    public IfError(value: any) {
        try {
            assert.ifError(value);
        } catch(assertionError) {
            this.info = new ErrorInfo(assertionError);
            this.FailTest();
        }
        
    }

    public NotStrictEquals(actual: any, expected: any, message?: string|Error) {
        try {
            assert.notStrictEqual(actual, expected, message);
        } catch(assertionError) {
            this.info = new ErrorInfo(assertionError);
            this.FailTest();
        }
    }

    public NotDeepStrictEquals(actual: any, expected: any, message?: string|Error) {
        try {
            assert.notDeepStrictEqual(actual, expected, message);
        } catch(assertionError) {
            this.info = new ErrorInfo(assertionError);
            this.FailTest();
        }
    }

    public True(value: any, message?: string|Error) {
        try {
            assert.ok(value, message);
        } catch(assertionError) {
            this.info = new ErrorInfo(assertionError);
            this.FailTest();
        }
    }

    public async Rejects(block: Function|Promise<any>, message?: string|Error) {
        try {
            await assert.rejects(block, message);
        } catch(assertionError) {
            this.info = new ErrorInfo(assertionError);
            this.FailTest();
        }
    }

    public Throws(block: Function, message?: string|Error) {
        try {
            assert.throws(block, message);
        } catch(assertionError) {
            this.info = new ErrorInfo(assertionError);
            this.FailTest();
        }
    }

    private FailTest() {
        console.error(`[${this.GetName()}] ${JSON.stringify(this.GetInfo())}`);
        process.exit(1);
    }

}

let Test = (testName: string, test: (test: TestCase) => void) => {
    let t = new TestCase(testName);
    test(t);
    console.log(`[${t.GetName()}] OK`);
}

export { Test };