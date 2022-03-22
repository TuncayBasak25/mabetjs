import { Folder } from "explorer";
import Controller from "./controller";
export default class Module {
    readonly folder: Folder;
    readonly controller: Controller;
    readonly submoduleList: Module[];
    readonly serviceList: any[];
    constructor(folder: Folder);
    private setupSubmodules;
    private setupServices;
    private setupRouting;
    private setupSubmodulesRouting;
}
//# sourceMappingURL=module.d.ts.map