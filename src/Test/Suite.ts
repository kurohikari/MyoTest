import * as path from "path";

let suites: Suite[] = [];

export class Suite {

    private file: string;
    private path: string;

    private constructor(file: string, filePath: string) {
        this.path = __filename;
        this.file = path.parse(this.path).base;
    }

    public static Get(): Suite {
        let filePath = __filename;
        let fileName = path.parse(filePath).base;
        let suite = new Suite(fileName, filePath);
        for(let s of suites) {
            if(s.GetPath() === filePath) {
                suite = s;
                break;
            }
        }
        return suite;
    }

    public GetFile(): string {
        return this.file;
    }

    public GetPath(): string {
        return this.path;
    }

}