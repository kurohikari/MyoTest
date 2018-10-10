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
Test_1.Test("Working test", (test) => {
    let example = new Example("example");
    test.StrictEquals(example.GetName(), "example");
});
Test_1.Test("Not working test", (test) => {
    let example = new Example("example");
    example.SetName("elpmaxe");
    test.StrictEquals(example.GetName(), "example");
});
