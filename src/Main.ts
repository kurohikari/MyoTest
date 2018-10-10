import { Example } from "./Example";
import { Test } from "./Test/Test";

Test("Working test", (test) => {
    let example = new Example("example");
    test.StrictEquals(example.GetName(), "example");
});

Test("Not working test", (test) => {
    let example = new Example("example");
    example.SetName("elpmaxe");
    test.StrictEquals(example.GetName(), "example");
});