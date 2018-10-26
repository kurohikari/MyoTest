"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestCase_1 = require("./TestCase");
const Suite_1 = require("./Suite");
/**
 * Defines a testcase to be run by the test suite
 * @param testName
 * @param testFunc
 */
function Test(testName, testFunc) {
    let t = new TestCase_1.TestCase(testName);
    let suite = Suite_1.Suite.Get(t.GetFilePath());
    suite.AddTestCase(t, testFunc);
}
exports.Test = Test;
/**
 * Sets a setup function for the current testsuite (will be overriden when called twice)
 * @param setupFunction
 */
function Setup(setupFunction) {
    let t = new TestCase_1.TestCase("");
    let suite = Suite_1.Suite.Get(t.GetFilePath());
    suite.SetOnSetup(setupFunction);
}
exports.Setup = Setup;
let proc = process;
process.on("beforeExit", async (code) => {
    let suites = Suite_1.Suite.GetAll();
    let willKill = true;
    if (!process.send)
        willKill = false;
    while (suites.length > 0) {
        let suite = suites.shift();
        await suite.Setup();
        await suite.RunTests();
        suite.clearTests();
        if (!willKill) {
            console.log(suite);
        }
        else {
            process.send(suite);
        }
    }
    proc.on("beforeExit", (c) => {
        if (!proc.send) {
            // Dont know how else to handle yet
        }
        else {
            proc.kill(0);
        }
    });
});
