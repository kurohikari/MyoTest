const exec = require("child_process").exec;
const path = require("path");
const fs = require("fs");
const Report = require("./out/Report/Report").Report;

const reserved = ["-s", "-o"];

function main() {
    let args = process.argv;
    let source = null;
    let output = "./myo-test";
    for(let i = 0; i<args.length; i++) {
        let arg = args[i];
        if(arg === "-s") {
            source = GetSource(args, i);
        } else if(arg === "-o") {
            output = GetOutput(args, i);
        }
    }
    if(source === null) {
        throw new Error("No argument passed for test source directory");
    } else if(output === null) {
        throw new Error("No argument passed for test output directory");
    } else {
        console.log("All okay!");
        if(!fs.existsSync(output)) {
            fs.mkdirSync(output);
        }
        Report.GetReport().SetOutput(output);
        RunTest(source);
    }
}

function RunTest(testDir) {
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
        let filePath = path.join(testDir, file);
        let p = exec(`node ${filePath}`);
        p.stdout.on("data", (data) => {
            console.log(file + " : " + data);
        });
        p.stderr.on("data", (data) => {
            console.log(file + " : " + data);
        });
    }
    for(let dir of dirs) {
        let dirPath = path.join(testDir, dir);
        RunTest(dirPath);
    }
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