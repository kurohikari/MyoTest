# ChangeLog
## [v0.17.0](https://github.com/kurohikari/MyoTest/tree/65b08f02b4beec3841f04f32ecff26f68cdd41c9) Before / After Test
### New Functionalities
* BeforeTest will run the same function before each test
* AfterTest will run the same function after each test
## [v0.16.0](https://github.com/kurohikari/MyoTest/projects/1#column-3673246) Setup / Teardown
### New functionalities
* Created Setup functionality: Runs a function before all tests in a suite.
* Created Teardown functionality: Runs a function after all tests in a suite.
### Big Fixes
* Path in test case
* Path in test detail
### Link
[v0.16.0](https://github.com/kurohikari/MyoTest/tree/cdf916aea776b9db2d99291b3ec1892a63eb0717)
## V0.0.15 Refactoring (25 / 10 / 2018)
## Link
[v0.0.15](https://github.com/kurohikari/MyoTest/tree/92cdeeece213e828b91d14f677e8745a6890d2a9)
### Refactoring
* Information collection done at test time
* Should increase reliability
* Removed CodeInfo, CodeSample, CodeLine
* TestCase used directly instead of TestResult
* Suite used directly instead of TestSuite
## V0.0.14 Colored lines (16 / 10 / 2018)
### New Functionalities
* Lines in a sample will be green when a test passed
* The line where the test failed will be red
## V0.0.13 Async support (16 / 10 / 2018)
### New Functionality
* Testcase can now be defined with async
### Bug Fix
* Handling when no test is performed in a testcase
## V0.0.12 Add test detail (13 / 10 / 2018)
### New Functionality
* Users can now click on a link on a test to see the test definition
### Bug fix
* Handling path with descendants for the source folder
## V0.0.11 Add links to path (13 / 10 / 2018)
### New Functionalities
* Users can now click on links in the path in the title of a suite to go to the directory
### Refactoring
* Replaced HtmlReport with HtmlSuite
* HtmlSuite using resources
* HTML removed from Resources
## V0.0.10 Hide/Show test details (12 / 10 / 2018)
### New Functionalities
* Clicking on the head of a test will hide/show the details of the test
### Refactoring
* Refactored to use resources folder rather than build html strings