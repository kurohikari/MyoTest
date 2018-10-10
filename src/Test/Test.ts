import * as assert from "assert";

export class TestCase {

    private info: any;
    private failed: boolean;

    constructor(private name: string) {
        this.info = null;
        this.failed = false;
    }

    public GetName() {
        return this.name;
    }

    public WasFailed() {
        return this.failed;
    }

    public GetInfo() {
        return this.info;
    }

    public StrictEquals(actual: any, expected: any, message?: string|Error) {
        if(this.failed) return;
        try {
            assert.strictEqual(actual, expected, message);
        } catch(assertionError) {
            this.info = assertionError;
            this.info.stackMessage = this.info.stack;
            this.info.errorMessage = this.info.message;
            this.FailTest();
        }
    }

    public DeepStrictEquals(actual: any, expected: any, message?: string|Error) {
        if(this.failed) return;
        try {
            assert.deepStrictEqual(actual, expected, message);
        } catch(assertionError) {
            this.info = assertionError;
            this.info.stackMessage = this.info.stack;
            this.info.errorMessage = this.info.message;
            this.FailTest();
        }
    }

    public async DoesNotReject(block: Function|Promise<any>, message?: string|Error) {
        if(this.failed) return;
        try {
            await assert.doesNotReject(block, message);
        } catch(assertionError) {
            this.info = assertionError;
            this.info.stackMessage = this.info.stack;
            this.info.errorMessage = this.info.message;
            this.FailTest();
        }
    }

    public DoesNotThrow(block: Function, message?: string|Error) {
        if(this.failed) return;
        try {
            assert.doesNotThrow(block, message);
        } catch(assertionError) {
            this.info = assertionError;
            this.info.stackMessage = this.info.stack;
            this.info.errorMessage = this.info.message;
            this.FailTest();
        }
    }

    public Fail(message?: string|Error) {
        if(this.failed) return;
        try {
            assert.fail(message);
        } catch(assertionError) {
            this.info = assertionError;
            this.info.stackMessage = this.info.stack;
            this.info.errorMessage = this.info.message;
            this.FailTest();
        }
    }

    public IfError(value: any) {
        if(this.failed) return;
        try {
            assert.ifError(value);
        } catch(assertionError) {
            this.info = assertionError;
            this.info.stackMessage = this.info.stack;
            this.info.errorMessage = this.info.message;
            this.FailTest();
        }
        
    }

    public NotStrictEquals(actual: any, expected: any, message?: string|Error) {
        if(this.failed) return;
        try {
            assert.notStrictEqual(actual, expected, message);
        } catch(assertionError) {
            this.info = assertionError;
            this.info.stackMessage = this.info.stack;
            this.info.errorMessage = this.info.message;
            this.FailTest();
        }
    }

    public NotDeepStrictEquals(actual: any, expected: any, message?: string|Error) {
        if(this.failed) return;
        try {
            assert.notDeepStrictEqual(actual, expected, message);
        } catch(assertionError) {
            this.info = assertionError;
            this.info.stackMessage = this.info.stack;
            this.info.errorMessage = this.info.message;
            this.FailTest();
        }
    }

    public True(value: any, message?: string|Error) {
        if(this.failed) return;
        try {
            assert.ok(value, message);
        } catch(assertionError) {
            this.info = assertionError;
            this.info.stackMessage = this.info.stack;
            this.info.errorMessage = this.info.message;
            this.FailTest();
        }
    }

    public async Rejects(block: Function|Promise<any>, message?: string|Error) {
        if(this.failed) return;
        try {
            await assert.rejects(block, message);
        } catch(assertionError) {
            this.info = assertionError;
            this.info.stackMessage = this.info.stack;
            this.info.errorMessage = this.info.message;
            this.FailTest();
        }
    }

    public Throws(block: Function, message?: string|Error) {
        if(this.failed) return;
        try {
            assert.throws(block, message);
        } catch(assertionError) {
            this.info = assertionError;
            this.info.stackMessage = this.info.stack;
            this.info.errorMessage = this.info.message;
            this.FailTest();
        }
    }

    private FailTest() {
        console.error(`[${this.GetName()}] ${JSON.stringify(this.GetInfo())}`);
        this.failed = true;
    }

}

let Test = (testName: string, test: (test: TestCase) => void) => {
    let t = new TestCase(testName);
    test(t);
    if(!t.WasFailed()) console.log(`[${t.GetName()}] OK`);
}

export { Test };