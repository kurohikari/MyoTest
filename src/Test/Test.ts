import { TestCase } from "./TestCase";
import { Suite } from "./Suite";

/**
 * Defines a testcase to be run by the test suite
 * @param testName 
 * @param testFunc 
 */
function Test(testName: string, testFunc: (test: TestCase) => void) {
    let t = new TestCase(testName);
    let suite = Suite.Get(t.GetFilePath());
    suite.AddTestCase(t, testFunc);
}

/**
 * Sets a setup function for the current testsuite (will be overriden when called twice)
 * @param setupFunction 
 */
function Setup(setupFunction: () => void) {
    let t = new TestCase("");
    let suite = Suite.Get(t.GetFilePath());
    suite.SetOnSetup(setupFunction);
}

/**
 * Sets a teardown function for the current testsuite (can be overriden when called multiple times)
 * @param teardownFunction 
 */
function Teardown(teardownFunction: () => void){
    let t = new TestCase("");
    let suite = Suite.Get(t.GetFilePath());
    suite.SetOnTeardown(teardownFunction);
}

let proc = process;

process.on("beforeExit", async (code) => {
    let suites = Suite.GetAll();
    let willKill = true;
    if(!process.send) willKill = false;
    while(suites.length > 0) {
        let suite = suites.shift();
        await suite.Setup();
        await suite.RunTests();
        await suite.Teardown();
        suite.ClearTests();
        if(!willKill) {
            console.log(suite);
        } else {
            process.send(suite);
        }
    }
    proc.on("beforeExit", (c) => {
        if(!proc.send) {
            // Dont know how else to handle yet
        } else {
            proc.kill(0);
        }
    });
});

export { Setup, Test, Teardown };