"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const TestCase_1 = require("./TestCase");
let suites = [];
class Suite {
    constructor(filepath) {
        this.path = filepath;
        this.file = path.parse(filepath).base;
        this.testCases = [];
    }
    static Get(filepath) {
        let suite = new Suite(filepath);
        let found = false;
        for (let s of suites) {
            if (s.GetPath() === filepath) {
                suite = s;
                found = true;
                break;
            }
        }
        if (!found) {
            suites.push(suite);
        }
        return suite;
    }
    static GetAll() {
        return suites;
    }
    AddTestCase(testCase) {
        this.testCases.push(testCase);
    }
    GetFile() {
        return this.file;
    }
    GetPath() {
        return this.path;
    }
    /**
     * Returns the test cases in the test suite
     */
    TestCases() {
        return this.testCases;
    }
    HasTests() {
        for (let testcase of this.testCases) {
            if (testcase.GetSuccessLines.length > 0 || testcase.WasFailed()) {
                return true;
            }
        }
        return false;
    }
    IsClean() {
        for (let testcase of this.testCases) {
            if (testcase.WasFailed())
                return false;
        }
        return true;
    }
    PassCount() {
        let count = 0;
        for (let testcase of this.testCases) {
            if (!testcase.WasFailed())
                count++;
        }
        return count;
    }
    FailCount() {
        let count = 0;
        for (let testcase of this.testCases) {
            if (testcase.WasFailed())
                count++;
        }
        return count;
    }
    static FromObject(object) {
        let suite = new Suite(object.path);
        for (let testcase of object.testCases) {
            let testCase = TestCase_1.TestCase.FromObject(testcase);
            suite.AddTestCase(testCase);
        }
        suites.push(suite);
        return suite;
    }
}
exports.Suite = Suite;
