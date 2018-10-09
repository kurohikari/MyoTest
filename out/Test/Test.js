"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
class TestCase {
    constructor(name) {
        this.name = name;
    }
    GetName() {
        return this.name;
    }
    StrictEquals(actual, expected, message) {
        assert.strictEqual(actual, expected, message);
    }
    DeepStrictEquals(actual, expected, message) {
        assert.deepStrictEqual(actual, expected, message);
    }
    DoesNotReject(block, message) {
        assert.doesNotReject(block, message);
    }
    DoesNotThrow(block, message) {
        assert.doesNotThrow(block, message);
    }
    Fail(message) {
        assert.fail(message);
    }
    IfError(value) {
        assert.ifError(value);
    }
    NotStrictEquals(actual, expected, message) {
        assert.notStrictEqual(actual, expected, message);
    }
    NotDeepStrictEquals(actual, expected, message) {
        assert.notDeepStrictEqual(actual, expected, message);
    }
    True(value, message) {
        assert.ok(value, message);
    }
    Rejects(block, message) {
        assert.rejects(block, message);
    }
    Throws(block, message) {
        assert.throws(block, message);
    }
}
let Test = (testName, test) => {
    let t = new TestCase(testName);
    test(t);
};
exports.Test = Test;
