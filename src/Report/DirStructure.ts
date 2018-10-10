export class DirStructure {

    private name: string;
    private files: string[];
    private children: DirStructure[];

    constructor(name: string) {
        this.name = name;
        this.files = [];
        this.children = [];
    }
    
    public GetName() {
        return this.name;
    }

    public GetFiles() {
        return this.files;
    }

    public GetChildren() {
        return this.children;
    }

    public AddFile(file: string) {
        if(this.HasFile(file)) return false;
        this.files.push(file);
        return true;
    }

    public AddChild(child: DirStructure) {
        if(this.HasChild(child)) return false;
        this.children.push(child);
        return true;
    }

    public HasFile(file: string) {
        for(let f of this.files) {
            if(f === file) {
                return true;
            }
        }
        return false;
    }

    public HasChild(child: DirStructure) {
        for(let c of this.children) {
            if(c.GetName() === child.GetName()) {
                return true;
            }
        }
        return false;
    }

    public GetChild(childName: string) {
        for(let c of this.children) {
            if(c.GetName() === childName) {
                return c;
            }
        }
        throw new Error(`Structure does not have child ${childName}!`);
    }

}