import express, { Application } from "express";
import { Folder } from "explorer";

import Module from "./module";

export class App {
    private readonly server: Application = express();
    private readonly PORT: string = process.env.PORT || "3000";

    private readonly folder: Folder;
    private readonly module: Module;

    public constructor(private readonly sourceFolderPath: string) {        
        this.folder = new Folder(this.sourceFolderPath);
        this.module = new Module(this.folder);
        this.server.use('/', this.module.ControllerClass.router);
    }

    public start(): void {
        this.server.listen(this.PORT, () => console.log("Listening on port " + this.PORT));
    }
}