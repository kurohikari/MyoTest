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
/**
 * Sets a function to be called before each test
 * @param beforeFunction
 */
function BeforeTest(beforeFunction) {
    let t = new TestCase_1.TestCase("");
    let suite = Suite_1.Suite.Get(t.GetFilePath());
    suite.SetOnBeforeTest(beforeFunction);
}
exports.BeforeTest = BeforeTest;
/**
 * Sets a function to be called after each test
 * @param afterFunction
 */
function AfterTest(afterFunction) {
    let t = new TestCase_1.TestCase("");
    let suite = Suite_1.Suite.Get(t.GetFilePath());
    suite.SetOnAfterTest(afterFunction);
}
exports.AfterTest = AfterTest;
/**
 * Sets a teardown function for the current testsuite (can be overriden when called multiple times)
 * @param teardownFunction
 */
function Teardown(teardownFunction) {
    let t = new TestCase_1.TestCase("");
    let suite = Suite_1.Suite.Get(t.GetFilePath());
    suite.SetOnTeardown(teardownFunction);
}
exports.Teardown = Teardown;
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
        await suite.Teardown();
        suite.ClearTests();
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
