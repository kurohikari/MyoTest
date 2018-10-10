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

    public Equals(actual: any, expected: any, message?: string|Error) {
        assert.strictEqual(actual, expected, message);
    }

    public DeepEquals(actual: any, expected: any, message?: string|Error) {
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
        assert.ok(value, message);
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
    try {
        test(t);
        console.log(`[${t.GetName()}] OK`);
    } catch(error) {
        let info = error;
        info.stackMessage = info.stack;
        info.errorMessage = info.message;
        console.error(`[${t.GetName()}] ${JSON.stringify(info)}`);
    }
}

export { Test };