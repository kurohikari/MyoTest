import * as assert from "assert";

export class TestCase {

    private info: any;
    private failed: boolean;

    constructor(private name: string) {
        this.info = [];
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
        let infoLine = (new Error().stack).split("at ");
        this.info.push({"paths": infoLine});
    }

    /**
     * Performs a strict deep equals assertion
     * @param actual value tested
     * @param expected value expected
     * @param message error message
     */
    public DeepEquals(actual: any, expected: any, message?: string|Error) {
        assert.deepStrictEqual(actual, expected, message);
        let infoLine = (new Error().stack).split("at ");
        this.info.push({"paths": infoLine});
    }

    /**
     * Checks if the block or promise tested does not reject
     * @param block code to test
     * @param message error message
     */
    public async DoesNotReject(block: Function|Promise<any>, message?: string|Error) {
        await assert.doesNotReject(block, message).catch(error => {throw error});
        let infoLine = (new Error().stack).split("at ");
        this.info.push({"paths": infoLine});
    }

    /**
     * Checks if the code throws and error
     * @param block code
     * @param message error message
     */
    public DoesNotThrow(block: Function, message?: string|Error) {
        assert.doesNotThrow(block, message);
        let infoLine = (new Error().stack).split("at ");
        this.info.push({"paths": infoLine});
    }

    /**
     * Fail a test case
     * @param message error message
     */
    public Fail(message?: string|Error) {
        assert.fail(message);
        let infoLine = (new Error().stack).split("at ");
        this.info.push({"paths": infoLine});
    }

    /**
     * Checks if valued passed is not null of undefined
     * @param value value to test
     */
    public IfError(value: any) {
        assert.ifError(value);
        let infoLine = (new Error().stack).split("at ");
        this.info.push({"paths": infoLine});
    }

    /**
     * Performs a not strict equals assertion
     * @param actual value tested
     * @param expected value expected
     * @param message error message
     */
    public NotEquals(actual: any, expected: any, message?: string|Error) {
        assert.notStrictEqual(actual, expected, message);
        let infoLine = (new Error().stack).split("at ");
        this.info.push({"paths": infoLine});
    }

    /**
     * Performs a not strict deep equals assertion
     * @param actual value tested
     * @param expected value expected
     * @param message error message
     */
    public NotDeepEquals(actual: any, expected: any, message?: string|Error) {
        assert.notDeepStrictEqual(actual, expected, message);
        let infoLine = (new Error().stack).split("at ");
        this.info.push({"paths": infoLine});
    }

    /**
     * Checks if a value is true
     * @param value value tested
     * @param message error message
     */
    public True(value: any, message?: string|Error) {
        assert.ok(value, message);
        let infoLine = (new Error().stack).split("at ");
        this.info.push({"paths": infoLine});
    }

    /**
     * Checks that the block of Promise rejects
     * @param block block to test
     * @param message error message
     */
    public async Rejects(block: Function|Promise<any>, message?: string|Error) {
        await assert.rejects(block, message).catch(error => {throw error});
        let infoLine = (new Error().stack).split("at ");
        this.info.push({"paths": infoLine});
    }

    /**
     * Checks if the block of message throws an error
     * @param block block of code
     * @param message error message
     */
    public Throws(block: Function, message?: string|Error) {
        assert.throws(block, message);
        let infoLine = (new Error().stack).split("at ");
        this.info.push({"paths": infoLine});
    }

}

let Test = (testName: string, test: (test: TestCase) => void) => {
    let t = new TestCase(testName);
    try {
        test(t);
        console.log(`[${t.GetName()}] ${JSON.stringify(t.GetInfo())}`);
    } catch(error) {
        let info = error;
        info.stackMessage = info.stack;
        info.errorMessage = info.message;
        console.error(`[${t.GetName()}] ${JSON.stringify(info)}`);
    }
}

export { Test };