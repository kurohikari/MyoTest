import * as assert from "assert";
import * as path from "path";

export class TestCase {

    private failed: boolean;
    private fileName: string;
    private filePath: string;
    private trace: string;
    private startLine: number;
    private startColumn: number;
    private successLines: number[];
    private errorLine: number;
    private errorTrace: string;
    private errorMessage: string;

    constructor(private name: string, object = null) {
        if(object === null) {
            this.successLines = [];
            this.failed = false;
            let testfilename = path.join(__dirname, "Test.js");
            let error = new Error();
            let stack = error.stack.split("at ").slice(1);
            for(let trace of stack) {
                if(trace.indexOf(__filename) < 0 && trace.indexOf(testfilename) < 0) {
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
        } else {
            this.failed = object.failed;
            this.fileName = object.fileName;
            this.filePath = object.filePath;
            this.trace = object.trace;
            this.startLine = object.startLine;
            this.startColumn = object.startColumn;
            this.successLines = object.successLines;
            this.errorLine = object.errorLine;
            this.errorTrace = object.errorTrace;
            this.errorMessage = object.errorMessage;
        }
    }

    /**
     * Turns an object to a testcase
     * @param object 
     */
    public static FromObject(object: any): TestCase {
        return new TestCase(object.name, object);
    }

    /**
     * Returns the name of the file tested with extension
     */
    public GetFileName(): string {
        return this.fileName;
    }

    /**
     * Get the path of the file tested
     */
    public GetFilePath(): string {
        return this.filePath;
    }

    /**
     * Returns the trace of the error where the filename appears
     */
    public GetTrace(): string {
        return this.trace;
    }

    /**
     * Returns the line number where the test starts
     */
    public GetStartLine(): number {
        return this.startLine;
    }

    /**
     * Returns the column number where the test starts
     */
    public GetStartColumn(): number {
        return this.startColumn;
    }

    /**
     * Returns the line numbers of successful tests
     */
    public GetSuccessLines(): number[] {
        return this.successLines;
    }

    /**
     * Returns the line number of an error
     */
    public GetErrorLine(): number {
        return this.errorLine;
    }

    /**
     * Get the error stack trace
     */
    public GetErrorTrace(): string {
        return this.errorTrace;
    }

    /**
     * Get the error message
     */
    public GetErrorMessage(): string {
        return this.errorMessage;
    }

    /**
     * Sets the error of the testcase and marks the testcase as failed
     * @param error error with the trace
     */
    public SetError(error: Error): void {
        this.failed = true;
        this.errorMessage = error.message;
        this.errorTrace = error.stack;
        for(let trace of this.errorTrace.split("at ").slice(1)) {
            let index = trace.indexOf(this.filePath);
            if(index >= 0) {
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
    public GetName() {
        return this.name;
    }

    /**
     * Return true if the test case failed
     */
    public WasFailed() {
        return this.failed;
    }
    
    /**
     * Performs a strict equals assertion (===)
     * @param actual value tested
     * @param expected value expected
     * @param message error message
     */
    public Equals(actual: any, expected: any, message?: string|Error) {
        assert.strictEqual(actual, expected, message);
        let stack = (new Error()).stack.split("at ").slice(1);
        for(let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if(index >= 0) {
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
    public DeepEquals(actual: any, expected: any, message?: string|Error) {
        assert.deepStrictEqual(actual, expected, message);
        let stack = (new Error()).stack.split("at ").slice(1);
        for(let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if(index >= 0) {
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
    public async DoesNotReject(block: Function|Promise<any>, message?: string|Error) {
        await assert.doesNotReject(block, message).catch(error => {throw error});
        let stack = (new Error()).stack.split("at ").slice(1);
        for(let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if(index >= 0) {
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
    public DoesNotThrow(block: Function, message?: string|Error) {
        assert.doesNotThrow(block, message);
        let stack = (new Error()).stack.split("at ").slice(1);
        for(let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if(index >= 0) {
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
    public Fail(message?: string|Error) {
        assert.fail(message);
        let stack = (new Error()).stack.split("at ").slice(1);
        for(let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if(index >= 0) {
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
    public IfError(value: any) {
        assert.ifError(value);
        let stack = (new Error()).stack.split("at ").slice(1);
        for(let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if(index >= 0) {
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
    public NotEquals(actual: any, expected: any, message?: string|Error) {
        assert.notStrictEqual(actual, expected, message);
        let stack = (new Error()).stack.split("at ").slice(1);
        for(let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if(index >= 0) {
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
    public NotDeepEquals(actual: any, expected: any, message?: string|Error) {
        assert.notDeepStrictEqual(actual, expected, message);
        let stack = (new Error()).stack.split("at ").slice(1);
        for(let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if(index >= 0) {
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
    public True(value: any, message?: string|Error) {
        assert.ok(value, message);
        let stack = (new Error()).stack.split("at ").slice(1);
        for(let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if(index >= 0) {
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
    public async Rejects(block: Function|Promise<any>, message?: string|Error) {
        await assert.rejects(block, message).catch(error => {throw error});
        let stack = (new Error()).stack.split("at ").slice(1);
        for(let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if(index >= 0) {
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
    public Throws(block: Function, message?: string|Error) {
        assert.throws(block, message);
        let stack = (new Error()).stack.split("at ").slice(1);
        for(let trace of stack) {
            let index = trace.indexOf(this.filePath);
            if(index >= 0) {
                let num = trace.substring(index + this.filePath.length + 1, trace.lastIndexOf(":"));
                let lineNum = parseInt(num);
                this.successLines.push(lineNum);
                break;
            }
        }
    }

}