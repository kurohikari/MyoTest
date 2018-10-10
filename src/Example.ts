import { Test } from "./Test/Test";

export class Example {

    constructor(private name: string) {

    }

    public GetName() {
        return this.name;
    }

    public SetName(newName: string) {
        this.name = newName;
    }

}

Test("Test valid name", (test) => {
    let example = new Example("example");
    test.StrictEquals(example.GetName(), "example");
});

Test("Test changed name", (test) => {
    let example = new Example("example");
    example.SetName("new example");
    test.NotStrictEquals(example.GetName(), "example");
    test.StrictEquals(example.GetName(), "new example");
});