const path = require("path");
const fs = require("fs");

const reserved = ["-s", "-o"];

function main() {
    let args = process.argv;
    let source = null;
    let output = null;
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