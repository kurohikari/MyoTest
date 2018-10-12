"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Report_1 = require("../../src/Report/Report");
const Test_1 = require("../../src/Test/Test");
Test_1.Test("Test Single Report", (test) => {
    let r1 = Report_1.Report.GetReport();
    let r2 = Report_1.Report.GetReport();
    test.DeepEquals(r1, r2);
});
