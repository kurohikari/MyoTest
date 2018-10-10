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
    StrictEquals(actual, expected, message) {
        if (this.failed)
            return;
        try {
            assert.strictEqual(actual, expected, message);
        }
        catch (assertionError) {
            this.info = assertionError;
            this.info.stackMessage = this.info.stack;
            this.info.errorMessage = this.info.message;
            this.FailTest();
        }
    }
    DeepStrictEquals(actual, expected, message) {
        if (this.failed)
            return;
        try {
            assert.deepStrictEqual(actual, expected, message);
        }
        catch (assertionError) {
            this.info = assertionError;
            this.info.stackMessage = this.info.stack;
            this.info.errorMessage = this.info.message;
            this.FailTest();
        }
    }
    DoesNotReject(block, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.failed)
                return;
            try {
                yield assert.doesNotReject(block, message);
            }
            catch (assertionError) {
                this.info = assertionError;
                this.info.stackMessage = this.info.stack;
                this.info.errorMessage = this.info.message;
                this.FailTest();
            }
        });
    }
    DoesNotThrow(block, message) {
        if (this.failed)
            return;
        try {
            assert.doesNotThrow(block, message);
        }
        catch (assertionError) {
            this.info = assertionError;
            this.info.stackMessage = this.info.stack;
            this.info.errorMessage = this.info.message;
            this.FailTest();
        }
    }
    Fail(message) {
        if (this.failed)
            return;
        try {
            assert.fail(message);
        }
        catch (assertionError) {
            this.info = assertionError;
            this.info.stackMessage = this.info.stack;
            this.info.errorMessage = this.info.message;
            this.FailTest();
        }
    }
    IfError(value) {
        if (this.failed)
            return;
        try {
            assert.ifError(value);
        }
        catch (assertionError) {
            this.info = assertionError;
            this.info.stackMessage = this.info.stack;
            this.info.errorMessage = this.info.message;
            this.FailTest();
        }
    }
    NotStrictEquals(actual, expected, message) {
        if (this.failed)
            return;
        try {
            assert.notStrictEqual(actual, expected, message);
        }
        catch (assertionError) {
            this.info = assertionError;
            this.info.stackMessage = this.info.stack;
            this.info.errorMessage = this.info.message;
            this.FailTest();
        }
    }
    NotDeepStrictEquals(actual, expected, message) {
        if (this.failed)
            return;
        try {
            assert.notDeepStrictEqual(actual, expected, message);
        }
        catch (assertionError) {
            this.info = assertionError;
            this.info.stackMessage = this.info.stack;
            this.info.errorMessage = this.info.message;
            this.FailTest();
        }
    }
    True(value, message) {
        if (this.failed)
            return;
        try {
            assert.ok(value, message);
        }
        catch (assertionError) {
            this.info = assertionError;
            this.info.stackMessage = this.info.stack;
            this.info.errorMessage = this.info.message;
            this.FailTest();
        }
    }
    Rejects(block, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.failed)
                return;
            try {
                yield assert.rejects(block, message);
            }
            catch (assertionError) {
                this.info = assertionError;
                this.info.stackMessage = this.info.stack;
                this.info.errorMessage = this.info.message;
                this.FailTest();
            }
        });
    }
    Throws(block, message) {
        if (this.failed)
            return;
        try {
            assert.throws(block, message);
        }
        catch (assertionError) {
            this.info = assertionError;
            this.info.stackMessage = this.info.stack;
            this.info.errorMessage = this.info.message;
            this.FailTest();
        }
    }
    FailTest() {
        console.error(`[${this.GetName()}] ${JSON.stringify(this.GetInfo())}`);
        this.failed = true;
    }
}
exports.TestCase = TestCase;
let Test = (testName, test) => {
    let t = new TestCase(testName);
    test(t);
    if (!t.WasFailed())
        console.log(`[${t.GetName()}] OK`);
};
exports.Test = Test;
