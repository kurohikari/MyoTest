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
    }
    catch (error) {
        t.SetError(error);
    }
};
exports.Test = Test;
process.on("beforeExit", (code) => {
    let suites = Suite_1.Suite.GetAll();
    for (let suite of suites) {
        process.send(suite);
    }
    process.kill(0);
});
