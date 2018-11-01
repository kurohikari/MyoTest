import { TestCase } from "../../../src/Test/TestCase";
/**
 * Defines a testcase to be run by the test suite
 * @param testName
 * @param testFunc
 */
declare function Test(testName: string, testFunc: (test: TestCase) => void): void;
/**
 * Sets a setup function for the current testsuite (will be overriden when called twice)
 * @param setupFunction
 */
declare function Setup(setupFunction: () => void): void;
/**
 * Sets a function to be called before each test
 * @param beforeFunction
 */
declare function BeforeTest(beforeFunction: () => void): void;
/**
 * Sets a function to be called after each test
 * @param afterFunction
 */
declare function AfterTest(afterFunction: () => void): void;
/**
 * Sets a teardown function for the current testsuite (can be overriden when called multiple times)
 * @param teardownFunction
 */
declare function Teardown(teardownFunction: () => void): void;
export { Setup, BeforeTest, Test, AfterTest, Teardown };
