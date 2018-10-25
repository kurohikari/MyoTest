"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const TestCase_1 = require("./TestCase");
const Suite_1 = require("./Suite");
let Test = (testName, testFunc) => __awaiter(this, void 0, void 0, function* () {
    let t = new TestCase_1.TestCase(testName);
    let suite = Suite_1.Suite.Get();
    console.log(JSON.stringify(suite));
    try {
        yield testFunc(t);
        console.log(`[${t.GetName()}] ${JSON.stringify(t.GetInfo())}`);
    }
    catch (error) {
        let err = error;
        err.stackMessage = err.stack;
        err.errorMessage = err.message;
        console.error(`[${t.GetName()}] ${JSON.stringify({ "info": t.GetInfo(), "err": err })}`);
    }
});
exports.Test = Test;
