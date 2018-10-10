"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Test_1 = require("./Test/Test");
class Sample {
}
exports.Sample = Sample;
Test_1.Test("Test fail", (test) => {
    test.True(1 > 2, "One should be more than two!");
});
