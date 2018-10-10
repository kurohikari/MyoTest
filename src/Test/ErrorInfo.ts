import * as Path from "path";

export class ErrorInfo {

    private info: string;
    private path: string;
    private file: string;

    constructor(private error: Error) {
        this.info = this.GetErrorInfo();
        this.path = this.GetIPath(this.info);
        this.file = Path.basename(this.path);
    }

    public GetInfo() {
        return this.info;
    }

    public GetPath() {
        return this.path;
    }

    public GetFile() {
        return this.file;
    }

    private GetErrorInfo() {
        let stack = this.error.stack;
        let trace = stack.split("\n")[2];
        let where = trace.split("(")[1].split(")")[0];
        return where;
    }

    private GetIPath(info: string) {
        let nonpath = info.search(/:\d+:\d+/);
        return info.substring(0, nonpath);
    }

}