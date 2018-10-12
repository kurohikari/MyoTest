import { DirStructure } from "./DirStructure";
import { TestSuite } from "./TestSuite";
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

    private constructor() {
        this.structure = null;
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
        this.structure.Clean();
        if(!fs.existsSync(this.output)) fs.mkdirSync(this.output);
        let stream = fs.createWriteStream(path.join(this.output, reportName));
        stream.write(JSON.stringify(this.structure), (error) => {
            if(error) {
                console.error("Error saving report!");
                console.error(error);
            } else stream.close();
        });
    }

    /**
     * Print all directories, directory tests and test result 
     * that are under the current structure
     * @param structure the current structure
     */
    public Verbose(structure = this.structure) {
        console.log(`[${structure.GetName()}]\n`);
        let suites : TestSuite[] = structure.GetTestSuites();
        for(let suite of suites){
            console.log(`=== ${suite.GetFileName()} ===\n`)
            let tests : TestResult[] = suite.GetTests();
            for(let test of tests){
                let passMsg : string = test.IsPassed() ? "OK":"KO";
                console.log(`\t--- ${test.GetTestName()}: ${passMsg}`)
            }
            console.log(`\n`);
        }

        let children : DirStructure[] = structure.GetChildren();
        for(let child of children){
            this.Verbose(child);
        }      
        
    }
}