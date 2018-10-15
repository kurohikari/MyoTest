"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Test_1 = require("../../src/Test/Test");
Test_1.Test("1", (test) => {
    test.True(true);
});
Test_1.Test("2", (test) => {
    let t = true;
    test.True(t);
    test.True(false);
    test.True(!(false));
});
Test_1.Test("3", (test) => {
    let a = 1;
    let b = 2;
    let c = a + b;
    c++;
    test.Equals(c, 4);
    test.NotEquals(c, 5);
    test.True(false);
});
