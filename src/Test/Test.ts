import { TestCase } from "./TestCase";
import { Suite } from "./Suite";

let Test = async (testName: string, testFunc: (test: TestCase) => void) => {
    let t = new TestCase(testName);
    let suite = Suite.Get();
    console.log(JSON.stringify(suite));
    try {
        await testFunc(t);
        console.log(`[${t.GetName()}] ${JSON.stringify(t.GetInfo())}`);
    } catch(error) {
        let err = error;
        err.stackMessage = err.stack;
        err.errorMessage = err.message;
        console.error(`[${t.GetName()}] ${JSON.stringify({"info": t.GetInfo(), "err": err})}`);
    }
}

export { Test };