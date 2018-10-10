"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
class ErrorInfo {
    constructor(error) {
        this.error = error;
        this.info = this.GetErrorInfo();
        this.path = this.GetIPath(this.info);
        this.file = Path.basename(this.path);
    }
    GetInfo() {
        return this.info;
    }
    GetPath() {
        return this.path;
    }
    GetFile() {
        return this.file;
    }
    GetErrorInfo() {
        let stack = this.error.stack;
        let trace = stack.split("\n")[2];
        let where = trace.split("(")[1].split(")")[0];
        return where;
    }
    GetIPath(info) {
        let nonpath = info.search(/:\d+:\d+/);
        return info.substring(0, nonpath);
    }
}
exports.ErrorInfo = ErrorInfo;
