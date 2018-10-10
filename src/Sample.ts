import { Test } from "./Test/Test";

export class Sample {

}

Test("Test fail", (test) => {
    test.True(1 > 2, "One should be more than two!");
});