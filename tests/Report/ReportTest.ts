import { Report } from "../../src/Report/Report";
import { Test } from "../../src/Test/Test";

Test("Test Single Report", (test) => {
    let r1 = Report.GetReport();
    let r2 = Report.GetReport();
    test.DeepEquals(r1, r2);
});