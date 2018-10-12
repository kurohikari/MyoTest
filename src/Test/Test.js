"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
class TestCase {
    constructor(name) {
        this.name = name;
        this.info = [];
        this.failed = false;
    }
    /**
     * Get the name of the test case
     */
    GetName() {
        return this.name;
    }
    /**
     * Return true if the test case failed
     */
    WasFailed() {
        return this.failed;
    }
    /**
     * Get the information associated with the test case
     */
    GetInfo() {
        return this.info;
    }
    /**
     * Performs a strict equals assertion (===)
     * @param actual value tested
     * @param expected value expected
     * @param message error message
     */
    Equals(actual, expected, message) {
        assert.strictEqual(actual, expected, message);
        let infoLine = (new Error().stack).split("at ");
        this.info.push({ "paths": infoLine });
    }
    /**
     * Performs a strict deep equals assertion
     * @param actual value tested
     * @param expected value expected
     * @param message error message
     */
    DeepEquals(actual, expected, message) {
        assert.deepStrictEqual(actual, expected, message);
        let infoLine = (new Error().stack).split("at ");
        this.info.push({ "paths": infoLine });
    }
    /**
     * Checks if the block or promise tested does not reject
     * @param block code to test
     * @param message error message
     */
    DoesNotReject(block, message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield assert.doesNotReject(block, message).catch(error => { throw error; });
            let infoLine = (new Error().stack).split("at ");
            this.info.push({ "paths": infoLine });
        });
    }
    /**
     * Checks if the code throws and error
     * @param block code
     * @param message error message
     */
    DoesNotThrow(block, message) {
        assert.doesNotThrow(block, message);
        let infoLine = (new Error().stack).split("at ");
        this.info.push({ "paths": infoLine });
    }
    /**
     * Fail a test case
     * @param message error message
     */
    Fail(message) {
        assert.fail(message);
        let infoLine = (new Error().stack).split("at ");
        this.info.push({ "paths": infoLine });
    }
    /**
     * Checks if valued passed is not null of undefined
     * @param value value to test
     */
    IfError(value) {
        assert.ifError(value);
        let infoLine = (new Error().stack).split("at ");
        this.info.push({ "paths": infoLine });
    }
    /**
     * Performs a not strict equals assertion
     * @param actual value tested
     * @param expected value expected
     * @param message error message
     */
    NotEquals(actual, expected, message) {
        assert.notStrictEqual(actual, expected, message);
        let infoLine = (new Error().stack).split("at ");
        this.info.push({ "paths": infoLine });
    }
    /**
     * Performs a not strict deep equals assertion
     * @param actual value tested
     * @param expected value expected
     * @param message error message
     */
    NotDeepEquals(actual, expected, message) {
        assert.notDeepStrictEqual(actual, expected, message);
        let infoLine = (new Error().stack).split("at ");
        this.info.push({ "paths": infoLine });
    }
    /**
     * Checks if a value is true
     * @param value value tested
     * @param message error message
     */
    True(value, message) {
        assert.ok(value, message);
        let infoLine = (new Error().stack).split("at ");
        this.info.push({ "paths": infoLine });
    }
    /**
     * Checks that the block of Promise rejects
     * @param block block to test
     * @param message error message
     */
    Rejects(block, message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield assert.rejects(block, message).catch(error => { throw error; });
            let infoLine = (new Error().stack).split("at ");
            this.info.push({ "paths": infoLine });
        });
    }
    /**
     * Checks if the block of message throws an error
     * @param block block of code
     * @param message error message
     */
    Throws(block, message) {
        assert.throws(block, message);
        let infoLine = (new Error().stack).split("at ");
        this.info.push({ "paths": infoLine });
    }
}
exports.TestCase = TestCase;
let Test = (testName, test) => {
    let t = new TestCase(testName);
    try {
        test(t);
        console.log(`[${t.GetName()}] ${JSON.stringify(t.GetInfo())}`);
    }
    catch (error) {
        let info = error;
        info.stackMessage = info.stack;
        info.errorMessage = info.message;
        console.error(`[${t.GetName()}] ${JSON.stringify(info)}`);
    }
};
exports.Test = Test;
