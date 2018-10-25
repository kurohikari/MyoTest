"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
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
}
exports.Suite = Suite;
