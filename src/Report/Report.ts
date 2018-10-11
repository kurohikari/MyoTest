import { DirStructure } from "./DirStructure";
import { TestResult } from "./TestResult";
import * as path from "path";
import * as fs from "fs";

/**
 * Name used for the report file
 */
const reportName: string = "myo-report.json";

let report: Report = null;

export class Report {

    private source: string;
    private output: string;
    private structure: DirStructure;
    private tests: {[file: string]: TestResult[]};

    private constructor() {
        this.tests = {};
        this.structure = null;
    }

    /**
     * Add a test result to the report
     * @param file file of the test
     * @param testResult the test result to add
     */
    public AddTest(file: string, testResult: TestResult) {
        if(!this.tests[file]) {
            this.tests[file] = [];
        }
        this.tests[file].push(testResult);
    }

    /**
     * Set the source folder of the tests
     * @param newSource 
     */
    public SetSource(newSource: string) {
        this.source = newSource;
    }

    /**
     * Get the source folder of the tests
     */
    public GetSource() {
        return this.source;
    }

    /**
     * Set the structure the report
     * @param newStructure structure of the report
     */
    public SetStructure(newStructure: DirStructure) {
        this.structure = newStructure;
    }

    /**
     * Get the report structure
     */
    public GetStructure() {
        return this.structure;
    }

    /**
     * Set the output folder for the report
     * @param newOutput 
     */
    public SetOutput(newOutput: string) {
        this.output = newOutput;
    }

    /**
     * Get the output folder for the project
     */
    public GetOutput() {
        return this.output;
    }

    /**
     * Get the singleton instance of the Report
     */
    public static GetReport() {
        if(report === null) report = new Report();
        return report;
    }

    /**
     * Save the report as a json file
     */
    public Save() {
        if(!fs.existsSync(this.output)) fs.mkdirSync(this.output);
        let stream = fs.createWriteStream(path.join(this.output, reportName));
        stream.write(JSON.stringify(this.tests), (error) => {
            if(error) {
                console.error("Error saving report!");
                console.error(error);
            } else stream.close();
        });
    }

}