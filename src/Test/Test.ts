import { TestCase } from "./TestCase";
import { Suite } from "./Suite";

let Test = async (testName: string, testFunc: (test: TestCase) => void) => {
    let t = new TestCase(testName);
    let suite = Suite.Get(t.GetFilePath());
    suite.AddTestCase(t);
    try {
        await testFunc(t);
        console.log(`[${t.GetName()}] ${JSON.stringify(t.GetInfo())}`);
    } catch(error) {
        t.SetError(error);
        let err = error;
        err.stackMessage = err.stack;
        err.errorMessage = err.message;
        console.error(`[${t.GetName()}] ${JSON.stringify({"info": t.GetInfo(), "err": err})}`);
    }
}

process.on("beforeExit", (code) => {
    let suites = Suite.GetAll();
    console.log(suites.length);
    for(let suite of suites) {
        console.log(suite.GetFile());
        for(let testcase of suite.TestCases()) {
            console.log(testcase);
        }
    }
});

export { Test };