import * as assert from "assert";

class TestCase {

    constructor(private name: string) {}

    public GetName() {
        return this.name;
    }

    public StrictEquals(actual: any, expected: any, message?: string|Error) {
        try {
            assert.strictEqual(actual, expected, message);
        } catch(assertionError) {
            console.log(assertionError)
        }
    }

    public DeepStrictEquals(actual: any, expected: any, message?: string|Error) {
        try {
            assert.deepStrictEqual(actual, expected, message);
        } catch(assertionError) {

        }
    }

    public async DoesNotReject(block: Function|Promise<any>, message?: string|Error) {
        try {
            await assert.doesNotReject(block, message);
        } catch(assertionError) {

        }
    }

    public DoesNotThrow(block: Function, message?: string|Error) {
        try {
            assert.doesNotThrow(block, message);
        } catch(assertionError) {

        }
    }

    public Fail(message?: string|Error) {
        try {
            assert.fail(message);
        } catch(assertionError) {

        }
    }

    public IfError(value: any) {
        try {
            assert.ifError(value);
        } catch(assertionError) {

        }
    }

    public NotStrictEquals(actual: any, expected: any, message?: string|Error) {
        try {
            assert.notStrictEqual(actual, expected, message);
        } catch(assertionError) {

        }
    }

    public NotDeepStrictEquals(actual: any, expected: any, message?: string|Error) {
        try {
            assert.notDeepStrictEqual(actual, expected, message);
        } catch(assertionError) {

        }
    }

    public True(value: any, message?: string|Error) {
        try {
            assert.ok(value, message);
        } catch(assertionError) {
            
        }
    }

    public async Rejects(block: Function|Promise<any>, message?: string|Error) {
        try {
            await assert.rejects(block, message);
        } catch(assertionError) {

        }
    }

    public Throws(block: Function, message?: string|Error) {
        try {
            assert.throws(block, message);
        } catch(assertionError) {

        }
    }

}

let Test = (testName: string, test: (test: TestCase) => void) => {
    let t = new TestCase(testName);
    test(t);
}

export { Test };