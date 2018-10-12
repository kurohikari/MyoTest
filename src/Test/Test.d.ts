export declare class TestCase {
    private name;
    private info;
    private failed;
    constructor(name: string);
    /**
     * Get the name of the test case
     */
    GetName(): string;
    /**
     * Return true if the test case failed
     */
    WasFailed(): boolean;
    /**
     * Get the information associated with the test case
     */
    GetInfo(): any;
    /**
     * Performs a strict equals assertion (===)
     * @param actual value tested
     * @param expected value expected
     * @param message error message
     */
    Equals(actual: any, expected: any, message?: string | Error): void;
    /**
     * Performs a strict deep equals assertion
     * @param actual value tested
     * @param expected value expected
     * @param message error message
     */
    DeepEquals(actual: any, expected: any, message?: string | Error): void;
    /**
     * Checks if the block or promise tested does not reject
     * @param block code to test
     * @param message error message
     */
    DoesNotReject(block: Function | Promise<any>, message?: string | Error): Promise<void>;
    /**
     * Checks if the code throws and error
     * @param block code
     * @param message error message
     */
    DoesNotThrow(block: Function, message?: string | Error): void;
    /**
     * Fail a test case
     * @param message error message
     */
    Fail(message?: string | Error): void;
    /**
     * Checks if valued passed is not null of undefined
     * @param value value to test
     */
    IfError(value: any): void;
    /**
     * Performs a not strict equals assertion
     * @param actual value tested
     * @param expected value expected
     * @param message error message
     */
    NotEquals(actual: any, expected: any, message?: string | Error): void;
    /**
     * Performs a not strict deep equals assertion
     * @param actual value tested
     * @param expected value expected
     * @param message error message
     */
    NotDeepEquals(actual: any, expected: any, message?: string | Error): void;
    /**
     * Checks if a value is true
     * @param value value tested
     * @param message error message
     */
    True(value: any, message?: string | Error): void;
    /**
     * Checks that the block of Promise rejects
     * @param block block to test
     * @param message error message
     */
    Rejects(block: Function | Promise<any>, message?: string | Error): Promise<void>;
    /**
     * Checks if the block of message throws an error
     * @param block block of code
     * @param message error message
     */
    Throws(block: Function, message?: string | Error): void;
}
declare let Test: (testName: string, test: (test: TestCase) => void) => void;
export { Test };
