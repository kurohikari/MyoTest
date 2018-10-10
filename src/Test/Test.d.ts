export declare class TestCase {
    private name;
    private info;
    private failed;
    constructor(name: string);
    GetName(): string;
    WasFailed(): boolean;
    GetInfo(): any;
    Equals(actual: any, expected: any, message?: string | Error): void;
    DeepEquals(actual: any, expected: any, message?: string | Error): void;
    DoesNotReject(block: Function | Promise<any>, message?: string | Error): Promise<void>;
    DoesNotThrow(block: Function, message?: string | Error): void;
    Fail(message?: string | Error): void;
    IfError(value: any): void;
    NotStrictEquals(actual: any, expected: any, message?: string | Error): void;
    NotDeepStrictEquals(actual: any, expected: any, message?: string | Error): void;
    True(value: any, message?: string | Error): void;
    Rejects(block: Function | Promise<any>, message?: string | Error): Promise<void>;
    Throws(block: Function, message?: string | Error): void;
}
declare let Test: (testName: string, test: (test: TestCase) => void) => void;
export { Test };
