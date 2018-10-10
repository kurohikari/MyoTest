const exec = require("child_process").exec;
const path = require("path");
const fs = require("fs");
const Report = require("./out/Report/Report").Report;
const TestResult = require("./out/Report/TestResult").TestResult;
const ReportParser = require("./out/Html/ReportParser").ReportParser;

const reserved = ["-s", "-o", "-g"];
let promises = [];

async function main() {
    let args = process.argv;
    let source = null;
    let output = "./myo-test";
    let generate = false;
    for(let i = 0; i<args.length; i++) {
        let arg = args[i];
        if(arg === "-s") {
            source = GetSource(args, i);
            i++;
        } else if(arg === "-o") {
            output = GetOutput(args, i);
            i++;
        } else if(arg === "-g") {
            generate = true;
        }
    }
    if(source === null) {
        throw new Error("No argument passed for test source directory");
    } else if(output === null) {
        throw new Error("No argument passed for test output directory");
    } else {
        if(!fs.existsSync(output)) {
            fs.mkdirSync(output);
        }
        Report.GetReport().SetOutput(output);
        RunTests(source);
        await Promise.all(promises);
        Report.GetReport().Save();
        if(generate) {
            ReportParser.ParseReport();
        }
    }
}

function RunTests(testDir) {
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
        RunTest(testDir, file);
    }
    for(let dir of dirs) {
        let dirPath = path.join(testDir, dir);
        RunTests(dirPath);
    }
}

function RunTest(dir, file) {
    let filePath = path.join(dir, file);
    let proc = exec(`node ${filePath}`);
    let promise = new Promise((resolve) => {
        proc.stdout.on("data", (data) => {
            if(data.toString().indexOf("[") === 0) {
                let testName = data.toString().split("[")[1].split("]")[0];
                let message = data.toString().substring(data.toString().indexOf("]")+1).trim();
                let result = new TestResult(testName, message, true);
                Report.GetReport().AddTest(file, result);
            } else {
                console.log(data);
            }
        });
        proc.stderr.on("data", (data) => {
            if(data.toString().indexOf("[") === 0) {
                let testName = data.toString().split("[")[1].split("]")[0];
                let message = data.toString().substring(data.toString().indexOf("]")+1).trim();
                let result = new TestResult(testName, message, false);
                Report.GetReport().AddTest(file, result);
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

main();