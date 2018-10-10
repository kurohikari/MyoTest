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
const ErrorInfo_1 = require("./ErrorInfo");
const Report_1 = require("../Report/Report");
class TestCase {
    constructor(name) {
        this.name = name;
        //console.log(process.cwd());
        this.info = null;
    }
    GetName() {
        return this.name;
    }
    GetInfo() {
        return this.info;
    }
    StrictEquals(actual, expected, message) {
        try {
            assert.strictEqual(actual, expected, message);
        }
        catch (assertionError) {
            this.info = new ErrorInfo_1.ErrorInfo(assertionError);
        }
        Report_1.Report.GetReport().AddTestCase(this);
    }
    DeepStrictEquals(actual, expected, message) {
        try {
            assert.deepStrictEqual(actual, expected, message);
        }
        catch (assertionError) {
            this.info = new ErrorInfo_1.ErrorInfo(assertionError);
        }
        Report_1.Report.GetReport().AddTestCase(this);
    }
    DoesNotReject(block, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield assert.doesNotReject(block, message);
            }
            catch (assertionError) {
                this.info = new ErrorInfo_1.ErrorInfo(assertionError);
            }
            Report_1.Report.GetReport().AddTestCase(this);
        });
    }
    DoesNotThrow(block, message) {
        try {
            assert.doesNotThrow(block, message);
        }
        catch (assertionError) {
            this.info = new ErrorInfo_1.ErrorInfo(assertionError);
        }
        Report_1.Report.GetReport().AddTestCase(this);
    }
    Fail(message) {
        try {
            assert.fail(message);
        }
        catch (assertionError) {
            this.info = new ErrorInfo_1.ErrorInfo(assertionError);
        }
        Report_1.Report.GetReport().AddTestCase(this);
    }
    IfError(value) {
        try {
            assert.ifError(value);
        }
        catch (assertionError) {
            this.info = new ErrorInfo_1.ErrorInfo(assertionError);
        }
        Report_1.Report.GetReport().AddTestCase(this);
    }
    NotStrictEquals(actual, expected, message) {
        try {
            assert.notStrictEqual(actual, expected, message);
        }
        catch (assertionError) {
            this.info = new ErrorInfo_1.ErrorInfo(assertionError);
        }
        Report_1.Report.GetReport().AddTestCase(this);
    }
    NotDeepStrictEquals(actual, expected, message) {
        try {
            assert.notDeepStrictEqual(actual, expected, message);
        }
        catch (assertionError) {
            this.info = new ErrorInfo_1.ErrorInfo(assertionError);
        }
        Report_1.Report.GetReport().AddTestCase(this);
    }
    True(value, message) {
        try {
            assert.ok(value, message);
        }
        catch (assertionError) {
            this.info = new ErrorInfo_1.ErrorInfo(assertionError);
        }
        Report_1.Report.GetReport().AddTestCase(this);
    }
    Rejects(block, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield assert.rejects(block, message);
            }
            catch (assertionError) {
                this.info = new ErrorInfo_1.ErrorInfo(assertionError);
            }
            Report_1.Report.GetReport().AddTestCase(this);
        });
    }
    Throws(block, message) {
        try {
            assert.throws(block, message);
        }
        catch (assertionError) {
            this.info = new ErrorInfo_1.ErrorInfo(assertionError);
        }
        Report_1.Report.GetReport().AddTestCase(this);
    }
}
exports.TestCase = TestCase;
let Test = (testName, test) => {
    let t = new TestCase(testName);
    test(t);
};
exports.Test = Test;
