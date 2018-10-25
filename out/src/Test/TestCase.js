"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const path = require("path");
class TestCase {
    constructor(name) {
        this.name = name;
        this.successLines = [];
        this.failed = false;
        let testfilename = path.join(__dirname, "Test.js");
        let error = new Error();
        let stack = error.stack.split("at ").slice(1);
        for (let trace of stack) {
            if (trace.indexOf(__filename) < 0 && trace.indexOf(testfilename) < 0) {
                this.trace = trace.substring(trace.indexOf("(") + 1, trace.lastIndexOf(")"));
                break;
            }
        }
        this.filePath = this.trace.substring(0, this.trace.lastIndexOf(":"));
        this.filePath = this.filePath.substring(0, this.filePath.lastIndexOf(":"));
        this.fileName = path.parse(this.filePath).base;
        this.startColumn = parseInt(this.trace.substring(this.trace.lastIndexOf(":") + 1));
        let noCol = this.trace.substring(0, this.trace.lastIndexOf(":"));
        this.startLine = parseInt(noCol.substring(noCol.lastIndexOf(":") + 1));
    }
    /**
     * Returns the name of the file tested with extension
     */
    GetFileName() {
        return this.fileName;
    }
    /**
     * Get the path of the file tested
     */
    GetFilePath() {
        return this.filePath;
    }
    /**
     * Returns the trace of the error where the filename appears
     */
    GetTrace() {
        return this.trace;
    }
    /**
     * Returns the line number where the test starts
     */
    GetStartLine() {
        return this.startLine;
    }
    /**
     * Returns the column number where the test starts
     */
    GetStartColumn() {
        return this.startColumn;
    }
    /**
     * Returns the line numbers of successful tests
     */
    GetSuccessLines() {
        return this.successLines;
    }
    /**
     * Returns the line number of an error
     */
    GetErrorLine() {
        return this.errorLine;
    }
    /**
     * Get the error stack trace
     */
    GetErrorTrace() {
        return this.errorTrace;
    }
    /**
     * Get the error message
     */
    GetErrorMessage() {
        return this.errorMessage;
    }
    /**
     * Sets the error of the testcase and marks the testcase as failed
     * @param error error with the trace
     */
    SetError(error) {
        this.failed = true;
        this.errorMessage = error.message;
        this.errorTrace = error.stack;
        for (let trace of this.errorTrace.split("at ").slice(1)) {
            let index = trace.indexOf(this.filePath);
            if (index >= 0) {
                let num = trace.substring(index + this.filePath.length + 1, trace.lastIndexOf(":"));
                let lineNum = parseInt(num);
                this.errorLine = lineNum;
                break;
            }
        }
    }
    /**
     * Get the name of the test case
     */
    GetName() {
        return this.name;
    }
    /**
     * Return true if the test case failed
     */
    WasFailed() {
        return this.failed;
    }
    /**
     * Performs a strict equals assertion (===)
     * @param actual value tested
     * @param expected value expected
     * @param message error message
     */
    Equals(actual, expected, message) {
        assert.strictEqual(actual, expected, message);
        let stack = (new Error()).stack.split("at ").slice(1);
        for (let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if (index >= 0) {
                let num = trace.substring(index + this.filePath.length + 1, trace.lastIndexOf(":"));
                let lineNum = parseInt(num);
                this.successLines.push(lineNum);
                break;
            }
        }
    }
    /**
     * Performs a strict deep equals assertion
     * @param actual value tested
     * @param expected value expected
     * @param message error message
     */
    DeepEquals(actual, expected, message) {
        assert.deepStrictEqual(actual, expected, message);
        let stack = (new Error()).stack.split("at ").slice(1);
        for (let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if (index >= 0) {
                let num = trace.substring(index + this.filePath.length + 1, trace.lastIndexOf(":"));
                let lineNum = parseInt(num);
                this.successLines.push(lineNum);
                break;
            }
        }
    }
    /**
     * Checks if the block or promise tested does not reject
     * @param block code to test
     * @param message error message
     */
    async DoesNotReject(block, message) {
        await assert.doesNotReject(block, message).catch(error => { throw error; });
        let stack = (new Error()).stack.split("at ").slice(1);
        for (let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if (index >= 0) {
                let num = trace.substring(index + this.filePath.length + 1, trace.lastIndexOf(":"));
                let lineNum = parseInt(num);
                this.successLines.push(lineNum);
                break;
            }
        }
    }
    /**
     * Checks if the code throws and error
     * @param block code
     * @param message error message
     */
    DoesNotThrow(block, message) {
        assert.doesNotThrow(block, message);
        let stack = (new Error()).stack.split("at ").slice(1);
        for (let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if (index >= 0) {
                let num = trace.substring(index + this.filePath.length + 1, trace.lastIndexOf(":"));
                let lineNum = parseInt(num);
                this.successLines.push(lineNum);
                break;
            }
        }
    }
    /**
     * Fail a test case
     * @param message error message
     */
    Fail(message) {
        assert.fail(message);
        let stack = (new Error()).stack.split("at ").slice(1);
        for (let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if (index >= 0) {
                let num = trace.substring(index + this.filePath.length + 1, trace.lastIndexOf(":"));
                let lineNum = parseInt(num);
                this.successLines.push(lineNum);
                break;
            }
        }
    }
    /**
     * Checks if valued passed is not null of undefined
     * @param value value to test
     */
    IfError(value) {
        assert.ifError(value);
        let stack = (new Error()).stack.split("at ").slice(1);
        for (let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if (index >= 0) {
                let num = trace.substring(index + this.filePath.length + 1, trace.lastIndexOf(":"));
                let lineNum = parseInt(num);
                this.successLines.push(lineNum);
                break;
            }
        }
    }
    /**
     * Performs a not strict equals assertion
     * @param actual value tested
     * @param expected value expected
     * @param message error message
     */
    NotEquals(actual, expected, message) {
        assert.notStrictEqual(actual, expected, message);
        let stack = (new Error()).stack.split("at ").slice(1);
        for (let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if (index >= 0) {
                let num = trace.substring(index + this.filePath.length + 1, trace.lastIndexOf(":"));
                let lineNum = parseInt(num);
                this.successLines.push(lineNum);
                break;
            }
        }
    }
    /**
     * Performs a not strict deep equals assertion
     * @param actual value tested
     * @param expected value expected
     * @param message error message
     */
    NotDeepEquals(actual, expected, message) {
        assert.notDeepStrictEqual(actual, expected, message);
        let stack = (new Error()).stack.split("at ").slice(1);
        for (let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if (index >= 0) {
                let num = trace.substring(index + this.filePath.length + 1, trace.lastIndexOf(":"));
                let lineNum = parseInt(num);
                this.successLines.push(lineNum);
                break;
            }
        }
    }
    /**
     * Checks if a value is true
     * @param value value tested
     * @param message error message
     */
    True(value, message) {
        assert.ok(value, message);
        let stack = (new Error()).stack.split("at ").slice(1);
        for (let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if (index >= 0) {
                let num = trace.substring(index + this.filePath.length + 1, trace.lastIndexOf(":"));
                let lineNum = parseInt(num);
                this.successLines.push(lineNum);
                break;
            }
        }
    }
    /**
     * Checks that the block of Promise rejects
     * @param block block to test
     * @param message error message
     */
    async Rejects(block, message) {
        await assert.rejects(block, message).catch(error => { throw error; });
        let stack = (new Error()).stack.split("at ").slice(1);
        for (let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if (index >= 0) {
                let num = trace.substring(index + this.filePath.length + 1, trace.lastIndexOf(":"));
                let lineNum = parseInt(num);
                this.successLines.push(lineNum);
                break;
            }
        }
    }
    /**
     * Checks if the block of message throws an error
     * @param block block of code
     * @param message error message
     */
    Throws(block, message) {
        assert.throws(block, message);
        let stack = (new Error()).stack.split("at ").slice(1);
        for (let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if (index >= 0) {
                let num = trace.substring(index + this.filePath.length + 1, trace.lastIndexOf(":"));
                let lineNum = parseInt(num);
                this.successLines.push(lineNum);
                break;
            }
        }
    }
}
exports.TestCase = TestCase;
