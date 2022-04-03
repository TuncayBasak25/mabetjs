import { Folder } from "explorer";
export default class Module {
    readonly folder: Folder;
    readonly ControllerClass: any;
    readonly moduleList: Module[];
    readonly serviceList: any[];
    constructor(folder: Folder);
    private importModules;
    private setupRouting;
    private setupSubmodulesRouting;
}
//# sourceMappingURL=module.d.ts.map