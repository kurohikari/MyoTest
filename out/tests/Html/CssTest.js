"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Test_1 = require("../../src/Test/Test");
Test_1.BeforeTest(() => {
    console.log("Before test");
});
Test_1.AfterTest(() => {
    console.log("After test");
});
Test_1.Test("OK", (test) => {
    let sthhhhhh = true;
    test.True(sthhhhhh);
});
Test_1.Test("Test 1", (test) => {
    test.True(true);
});
function Func() {
    return new Promise((resolve, reject) => {
        if (1 + 1 === 2) {
            resolve(1);
        }
        else {
            reject(-1);
        }
    });
}
Test_1.Test("Test Func", async (test) => {
    let num = await Func();
    test.Equals(num, 1);
    let num2 = await Func();
    test.Equals(num, 1);
});
Test_1.Test("Test Func 2", async (test) => {
    let num = await Func();
    test.Equals(num, 1);
    let num2 = await Func();
    test.Equals(num, 3);
});
Test_1.Test("Test Func 3", async (test) => {
    let num = await Func();
    test.Equals(num, 3);
    let num2 = await Func();
    test.Equals(num, 1);
});
let str = "Hello World!";
Test_1.Setup(() => {
    str = "Goodbye cruel world!";
});
Test_1.Test("Test setup", (test) => {
    test.Equals(str, "Goodbye cruel world!", "str should be 'Goodbye cruel world!'");
});
Test_1.Teardown(() => {
    str = null;
});
