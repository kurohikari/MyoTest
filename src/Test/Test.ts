import * as assert from "assert";

class TestCase {

    constructor(private name: string) {}

    public GetName() {
        return this.name;
    }

    public StrictEquals(actual: any, expected: any, message?: string|Error) {
        assert.strictEqual(actual, expected, message);
    }

    public DeepStrictEquals(actual: any, expected: any, message?: string|Error) {
        assert.deepStrictEqual(actual, expected, message);
    }

    public async DoesNotReject(block: Function|Promise<any>, message?: string|Error) {
        await assert.doesNotReject(block, message);
    }

    public DoesNotThrow(block: Function, message?: string|Error) {
        assert.doesNotThrow(block, message);
    }

    public Fail(message?: string|Error) {
        assert.fail(message);
    }

    public IfError(value: any) {
        assert.ifError(value);
    }

    public NotStrictEquals(actual: any, expected: any, message?: string|Error) {
        assert.notStrictEqual(actual, expected, message);
    }

    public NotDeepStrictEquals(actual: any, expected: any, message?: string|Error) {
        assert.notDeepStrictEqual(actual, expected, message);
    }

    public True(value: any, message?: string|Error) {
        assert.ok(value, message)
    }

    public async Rejects(block: Function|Promise<any>, message?: string|Error) {
        await assert.rejects(block, message);
    }

    public Throws(block: Function, message?: string|Error) {
        assert.throws(block, message);
    }

}

let Test = (testName: string, test: (test: TestCase) => void) => {
    let t = new TestCase(testName);
    test(t);
}

export { Test };