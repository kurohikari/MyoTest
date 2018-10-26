import { Setup, Test } from "../../src/Test/Test";

Test("OK", (test) => {
    let sthhhhhh = true;
    test.True(sthhhhhh);
});

Test("Test 1", (test) => {
    test.True(true);
});

function Func () {
    return new Promise<number>((resolve, reject) => {
        if(1+1 === 2) {
            resolve(1);
        } else {
            reject(-1);
        }
    });
}

Test("Test Func", async (test) => {
    let num = await Func();
    test.Equals(num, 1);
    let num2 = await Func();
    test.Equals(num, 1);
});

Test("Test Func 2", async (test) => {
    let num = await Func();
    test.Equals(num, 1);
    let num2 = await Func();
    test.Equals(num, 3);
});

Test("Test Func 3", async (test) => {
    let num = await Func();
    test.Equals(num, 3);
    let num2 = await Func();
    test.Equals(num, 1);
});

let str = "Hello World!";

Setup(() => {
    str = "Goodbye cruel world!";
});

Test("Test setup", (test) => {
    test.Equals(str, "Goodbye cruel world!", "str should be 'Goodbye cruel world!'");
});