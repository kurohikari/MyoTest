import { Test } from "../../src/Test/Test";

Test("OK", (test) => {
    test.True(true);
});

Test("OK", (test) => {
    test.True(false);
});