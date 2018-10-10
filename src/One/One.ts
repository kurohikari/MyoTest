import { Test } from "../Test/Test";

Test("Test increment", (test) => {
    let a = parseInt((Math.random() * 100).toString());
    let b = a;
    a++;
    test.StrictEquals(a, b);
});