"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
let suites = [];
class Suite {
    constructor(file, filePath) {
        this.path = __filename;
        this.file = path.parse(this.path).base;
    }
    static Get() {
        let filePath = __filename;
        let fileName = path.parse(filePath).base;
        let suite = new Suite(fileName, filePath);
        for (let s of suites) {
            if (s.GetPath() === filePath) {
                suite = s;
                break;
            }
        }
        return suite;
    }
    GetFile() {
        return this.file;
    }
    GetPath() {
        return this.path;
    }
}
exports.Suite = Suite;
