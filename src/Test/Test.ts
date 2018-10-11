import * as assert from "assert";

export class TestCase {

    private info: any;
    private failed: boolean;

    constructor(private name: string) {
        this.info = null;
        this.failed = false;
    }

    /**
     * Get the name of the test case
     */
    public GetName() {
        return this.name;
    }

    /**
     * Return true if the test case failed
     */
    public WasFailed() {
        return this.failed;
    }

    /**
     * Get the information associated with the test case
     */
    public GetInfo() {
        return this.info;
    }

    /**
     * Performs a strict equals assertion (===)
     * @param actual value tested
     * @param expected value expected
     * @param message error message
     */
    public Equals(actual: any, expected: any, message?: string|Error) {
        assert.strictEqual(actual, expected, message);
    }

    /**
     * Performs a strict deep equals assertion
     * @param actual value tested
     * @param expected value expected
     * @param message error message
     */
    public DeepEquals(actual: any, expected: any, message?: string|Error) {
        assert.deepStrictEqual(actual, expected, message);
    }

    /**
     * Checks if the block or promise tested does not reject
     * @param block code to test
     * @param message error message
     */
    public async DoesNotReject(block: Function|Promise<any>, message?: string|Error) {
        await assert.doesNotReject(block, message).catch(error => {throw error});
    }

    /**
     * Checks if the code throws and error
     * @param block code
     * @param message error message
     */
    public DoesNotThrow(block: Function, message?: string|Error) {
        assert.doesNotThrow(block, message);
    }

    /**
     * Fail a test case
     * @param message error message
     */
    public Fail(message?: string|Error) {
        assert.fail(message);
    }

    /**
     * Checks if valued passed is not null of undefined
     * @param value value to test
     */
    public IfError(value: any) {
        assert.ifError(value);
    }

    /**
     * Performs a not strict equals assertion
     * @param actual value tested
     * @param expected value expected
     * @param message error message
     */
    public NotEquals(actual: any, expected: any, message?: string|Error) {
        assert.notStrictEqual(actual, expected, message);
    }

    /**
     * Performs a not strict deep equals assertion
     * @param actual value tested
     * @param expected value expected
     * @param message error message
     */
    public NotStrictEquals(actual: any, expected: any, message?: string|Error) {
        assert.notDeepStrictEqual(actual, expected, message);
    }

    /**
     * Checks if a value is true
     * @param value value tested
     * @param message error message
     */
    public True(value: any, message?: string|Error) {
        assert.ok(value, message);
    }

    /**
     * Checks that the block of Promise rejects
     * @param block block to test
     * @param message error message
     */
    public async Rejects(block: Function|Promise<any>, message?: string|Error) {
        await assert.rejects(block, message).catch(error => {throw error});
    }

    /**
     * Checks if the block of message throws an error
     * @param block block of code
     * @param message error message
     */
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