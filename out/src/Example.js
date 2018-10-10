"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Test_1 = require("./Test/Test");
class Example {
    constructor(name) {
        this.name = name;
    }
    GetName() {
        return this.name;
    }
    SetName(newName) {
        this.name = newName;
    }
}
exports.Example = Example;
Test_1.Test("Test valid name", (test) => {
    let example = new Example("example");
    test.StrictEquals(example.GetName(), "example");
});
Test_1.Test("Test fail", (test) => {
    test.True(1 > 2, "One should be more than two!");
});
Test_1.Test("Test changed name", (test) => {
    let example = new Example("example");
    example.SetName("new example");
    test.NotStrictEquals(example.GetName(), "example");
    test.StrictEquals(example.GetName(), "new example");
});
