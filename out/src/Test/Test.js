"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestCase_1 = require("./TestCase");
const Suite_1 = require("./Suite");
let Test = async (testName, testFunc) => {
    let t = new TestCase_1.TestCase(testName);
    let suite = Suite_1.Suite.Get(t.GetFilePath());
    suite.AddTestCase(t);
    try {
        await testFunc(t);
        console.log(`[${t.GetName()}] ${JSON.stringify(t.GetInfo())}`);
    }
    catch (error) {
        t.SetError(error);
        let err = error;
        err.stackMessage = err.stack;
        err.errorMessage = err.message;
        console.error(`[${t.GetName()}] ${JSON.stringify({ "info": t.GetInfo(), "err": err })}`);
    }
};
exports.Test = Test;
process.on("beforeExit", (code) => {
    let suites = Suite_1.Suite.GetAll();
    console.log(suites.length);
    for (let suite of suites) {
        console.log(suite.GetFile());
        for (let testcase of suite.TestCases()) {
            console.log(testcase);
        }
    }
});
