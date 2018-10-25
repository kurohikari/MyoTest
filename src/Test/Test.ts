import { TestCase } from "./TestCase";
import { Suite } from "./Suite";

let Test = async (testName: string, testFunc: (test: TestCase) => void) => {
    let t = new TestCase(testName);
    let suite = Suite.Get(t.GetFilePath());
    suite.AddTestCase(t);
    try {
        await testFunc(t);
    } catch(error) {
        t.SetError(error);
    }
}

process.on("beforeExit", (code) => {
    let suites = Suite.GetAll();
    for(let suite of suites) {
        process.send(suite);
    }
    process.kill(0);
});

export { Test };