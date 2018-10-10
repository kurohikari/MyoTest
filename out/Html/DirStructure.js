"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DirStructure {
    constructor(name) {
        this.name = name;
        this.files = [];
        this.children = [];
    }
    GetName() {
        return this.name;
    }
    GetFiles() {
        return this.files;
    }
    GetChildren() {
        return this.children;
    }
    AddFile(file) {
        if (this.HasFile(file))
            return false;
        this.files.push(file);
        return true;
    }
    AddChild(child) {
        if (this.HasChild(child))
            return false;
        this.children.push(child);
        return true;
    }
    HasFile(file) {
        for (let f of this.files) {
            if (f === file) {
                return true;
            }
        }
        return false;
    }
    HasChild(child) {
        for (let c of this.children) {
            if (c.GetName() === child.GetName()) {
                return true;
            }
        }
        return false;
    }
    GetChild(childName) {
        for (let c of this.children) {
            if (c.GetName() === childName) {
                return c;
            }
        }
        throw new Error(`Structure does not have child ${childName}!`);
    }
}
exports.DirStructure = DirStructure;
