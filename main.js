const exec = require("child_process").exec;
const path = require("path");
const fs = require("fs");
const Report = require("./out/src/Report/Report").Report;
const TestResult = require("./out/src/Report/TestResult").TestResult;
const TestSuite = require("./out/src/Report/TestSuite").TestSuite;
const ReportParser = require("./out/src/Html/ReportParser").ReportParser;
const DirStructure = require("./out/src/Report/DirStructure").DirStructure;

const reserved = ["-s", "--source", "-o", "--output", "-g", "--generate"];
let promises = [];
//
async function main() {
    let args = process.argv;
    let source = null;
    let output = "./myo-test";
    let generate = false;
    for(let i = 0; i<args.length; i++) {
        let arg = args[i];
        if(arg === "-s" || arg === "--source") {
            source = GetSource(args, i);
            i++;
        } else if(arg === "-o" || arg === "--output") {
            output = GetOutput(args, i);
            i++;
        } else if(arg === "-g" || arg === "--generate") {
            generate = true;
        }
    }
    if(source === null) {
        throw new Error("No argument passed for test source directory");
    } else if(output === null) {
        throw new Error("No argument passed for test output directory");
    } else {
        DeleteOutput(output);
        let structure = new DirStructure("Root", true);
        let report = Report.GetReport();
        report.SetOutput(output);
        report.SetSource(source);
        RunTests(source, structure);
        await Promise.all(promises).catch(error => {throw error});;
        report.SetStructure(structure);
        report.Save();
        if(generate) {
            ReportParser.ParseReport();
        }
    }
}

function DeleteOutput(output) {
    if(!fs.existsSync(output)) return;
    if(fs.statSync(output).isDirectory()) {
        let reads = fs.readdirSync(output);
        for(let read of reads) {
            let newPath = path.join(output, read);
            DeleteOutput(newPath);
        }
        fs.rmdirSync(output);
    } else {
        fs.unlinkSync(output);
    }
}

function RunTests(testDir, structure) {
    let reads = fs.readdirSync(testDir);
    let files = [];
    let dirs = [];
    for(let read of reads) {
        let readPath = path.join(testDir, read);
        if(fs.statSync(readPath).isDirectory()) {
            dirs.push(read);
        } else if(read.endsWith(".js")) {
            files.push(read);
        }
    }
    for(let file of files) {
        let testSuite = new TestSuite(file);
        structure.AddTestSuite(testSuite);
        RunTest(testDir, file, structure, testSuite);
    }
    for(let dir of dirs) {
        structure.AddChild(new DirStructure(dir));
        let dirPath = path.join(testDir, dir);
        RunTests(dirPath, structure.GetChild(dir));
    }
}

function RunTest(dir, file, structure, suite) {
    let filePath = path.join(dir, file);
    let proc = exec(`node ${filePath}`);
    let promise = new Promise((resolve) => {
        proc.stdout.on("data", (data) => {
            if(data.toString().indexOf("[") === 0) {
                let testName = data.toString().split("[")[1].split("]")[0];
                let message = data.toString().substring(data.toString().indexOf("]")+1).trim();
                let result = new TestResult(testName, filePath, message, true);
                suite.AddTest(result);
            } else {
                console.log(data);
            }
        });
        proc.stderr.on("data", (data) => {
            if(data.toString().indexOf("[") === 0) {
                let testName = data.toString().split("[")[1].split("]")[0];
                let message = data.toString().substring(data.toString().indexOf("]")+1).trim();
                let result = new TestResult(testName, filePath, message, false);
                suite.AddTest(result);
            } else {
                console.error(data);
            }
        });
        proc.on("close", () => {
            resolve();
        });
    });
    promises.push(promise);
}

function GetSource(args, index) {
    if(args.length <= index+1) {
        throw new Error("No argument passed for test source directory");
    }
    let next = args[index+1];
    if(reserved.indexOf(next) > -1) {
        throw new Error("No argument passed for test source directory");
    }
    if(!fs.existsSync(next)) {
        throw new Error("Source directory does not exist!");
    }
    return next;
}

function GetOutput(args, index) {
    if(args.length <= index+1) {
        throw new Error("No argument passed for test output directory");
    }
    let next = args[index+1];
    if(reserved.indexOf(next) > -1) {
        throw new Error("No argument passed for test output directory");
    }
    return next;
}

main().catch(error => {
    console.error(error);
});