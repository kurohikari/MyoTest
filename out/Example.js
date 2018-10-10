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
Test_1.Test("Test changed name", (test) => {
    let example = new Example("example");
    example.SetName("new example");
    test.StrictEquals(example.GetName(), "new example");
});
