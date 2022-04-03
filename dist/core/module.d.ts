import { Folder } from "explorer";
import { Controller } from "./controller";
export default class Module {
    readonly folder: Folder;
    readonly controller: Controller;
    readonly moduleList: Module[];
    readonly serviceList: any[];
    constructor(folder: Folder);
    private importModules;
    private importServices;
    private setupRouting;
    private setupSubmodulesRouting;
}
//# sourceMappingURL=module.d.ts.map