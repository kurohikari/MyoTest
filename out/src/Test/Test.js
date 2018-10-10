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
        this.info = null;
        this.failed = false;
    }
    GetName() {
        return this.name;
    }
    WasFailed() {
        return this.failed;
    }
    GetInfo() {
        return this.info;
    }
    Equals(actual, expected, message) {
        assert.strictEqual(actual, expected, message);
    }
    DeepEquals(actual, expected, message) {
        assert.deepStrictEqual(actual, expected, message);
    }
    DoesNotReject(block, message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield assert.doesNotReject(block, message).catch(error => { throw error; });
        });
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
        return __awaiter(this, void 0, void 0, function* () {
            yield assert.rejects(block, message).catch(error => { throw error; });
        });
    }
    Throws(block, message) {
        assert.throws(block, message);
    }
}
exports.TestCase = TestCase;
let Test = (testName, test) => {
    let t = new TestCase(testName);
    try {
        test(t);
        console.log(`[${t.GetName()}] OK`);
    }
    catch (error) {
        let info = error;
        info.stackMessage = info.stack;
        info.errorMessage = info.message;
        console.error(`[${t.GetName()}] ${JSON.stringify(info)}`);
    }
};
exports.Test = Test;
