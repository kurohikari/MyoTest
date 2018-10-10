"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Test_1 = require("../Test/Test");
Test_1.Test("Test increment", (test) => {
    let a = parseInt((Math.random() * 100).toString());
    let b = a;
    a++;
    test.StrictEquals(a, b);
});
