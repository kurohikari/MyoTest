import { Test } from "../../src/Test/Test";

Test("OK", (test) => {
    test.True(true);
});

Test("OK", (test) => {
    let t = true;
    test.True(t);
    test.True(false);
    test.True(!(false));
});

Test("OK", (test) => {
    let a = 1;
    let b = 2;
    let c = a+b;
    c++;
    test.Equals(c, 4);
    test.NotEquals(c, 5);
    test.True(false);
});