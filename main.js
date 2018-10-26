const DirStructure = require("./out/src/Report/DirStructure").DirStructure;
const ReportParser = require("./out/src/Html/ReportParser").ReportParser;
const Report = require("./out/src/Report/Report").Report;
const Suite = require("./out/src/Test/Suite").Suite;
const fork = require("child_process").fork;
const path = require("path");
const fs = require("fs");

const reserved = ["-s", "--source", "-o", "--output", "-g", "--generate", "-v", "--verbose"];
let promises = [];

async function main() {
    let args = process.argv;
    let source = null;
    let output = "./myo-test";
    let generate = false;
    let verbose = false ; 
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
        } else if(arg === "-v" || arg === "--verbose") {
            verbose = true;
        }
    }
    if(source === null) {
        throw new Error("No argument passed for test source directory");
    } else if(output === null) {
        throw new Error("No argument passed for test output directory");
    } else {
        DeleteOutput(output);
        let structure = new DirStructure(path.parse(source).base, true);
        let report = Report.GetReport();
        report.SetOutput(output);
        RunTests(source, structure);
        await Promise.all(promises).catch(error => {console.error(error)})
        report.SetStructure(structure);
        report.Save();
        if(generate) {
            ReportParser.ParseReport();
        } 
        
        if(verbose){
            report.Verbose();
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
        RunTest(testDir, file, structure);
    }
    for(let dir of dirs) {
        structure.AddChild(new DirStructure(dir));
        let dirPath = path.join(testDir, dir);
        RunTests(dirPath, structure.GetChild(dir));
    }
}

function RunTest(dir, file, structure) {
    let filePath = path.join(dir, file);
    let proc = fork(`${filePath}`, { stdio: "pipe" });
    let promise = new Promise((resolve) => {
        proc.on("message", (m) => {
            let suite = Suite.FromObject(m);
            structure.AddSuite(suite);
        });
        proc.on("exit", () => {
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
    let p = "";
    if(!path.isAbsolute(next)) {
        p = path.join(__dirname, next);
    } else {
        p = next;
    }
    Report.GetReport().SetSource(p);
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