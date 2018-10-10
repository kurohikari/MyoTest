"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Example_1 = require("./Example");
const Test_1 = require("./Test/Test");
Test_1.Test("Working test", (test) => {
    let example = new Example_1.Example("example");
    test.StrictEquals(example.GetName(), "example");
});
Test_1.Test("Not working test", (test) => {
    let example = new Example_1.Example("example");
    example.SetName("elpmaxe");
    test.StrictEquals(example.GetName(), "example");
});
