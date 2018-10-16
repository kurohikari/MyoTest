import { Test } from "../Resources/Resources";

export class CodeLine {

    private state: "neutral" | "passed" | "failed";

    constructor(private line: string, private lineNumber: number) {
        this.state = "neutral";
    }

    public SetState(newState: "neutral" | "passed" | "failed"): void {
        this.state = newState;
    }

    public GetState(): string {
        return this.state;
    }

    public GetLine(): string {
        return this.line;
    }

    public GetLineNumber(): number {
        return this.lineNumber;
    }

    public GenerateAsHTML(): string {
        return Test.line.replace("{{color}}", this.GetClassForState())
            .replace("{{linenumber}}", `${this.lineNumber}`)
            .replace("{{line}}", this.line);
    }

    private GetClassForState(): string {
        if(this.state === "neutral") {
            return "neutral-line";
        } else if(this.state === "passed") {
            return "passed-line";
        } else if(this.state === "failed") {
            return "failed-line";
        } else {
            throw new Error(`Unknown state: ${this.state}`);
        }
    }

}