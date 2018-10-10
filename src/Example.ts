export class Example {

    constructor(private name: string) {

    }

    public GetName() {
        return this.name;
    }

    public SetName(newName: string) {
        this.name = newName;
    }

}