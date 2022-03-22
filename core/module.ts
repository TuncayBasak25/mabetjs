import { NextFunction, Request, Response } from "express";
import { Folder } from "explorer";

import Controller from "./controller";
import { controllerRoutingRepositoryMap } from "./routing";


export default class Module {
    public readonly controller: Controller;
    public readonly submoduleList: Module[] = [];
    public readonly serviceList: any[] = [];

    public constructor(public readonly folder: Folder) {
        this.setupSubmodules();

        this.setupServices();

        const ControllerClass = this.folder.getFileIncluding("controller")?.require();

        if (!ControllerClass) {
            throw new Error("Every module has to include a controller.");
        }

        this.controller = new ControllerClass(...this.serviceList);

        this.setupRouting();

        this.setupSubmodulesRouting();
    }

    private setupSubmodules(): void {
        const submodulesFolder = this.folder.subfolders.submodules;
        if (submodulesFolder?.subfolderList.length > 0) {
            for (let submoduleFolder of submodulesFolder.subfolderList) {
                this.submoduleList.push(new Module(submoduleFolder));
            }
        }
    }

    private setupServices(): void {
        if (this.folder.subfolders.services) {
            for (let serviceFile of this.folder.subfolders.services.fileList) {
                const Service = serviceFile.require();

                this.serviceList.push(new Service());
            }
        }
    }

    private setupRouting(): void {
        const repository = controllerRoutingRepositoryMap.get(this.controller.constructor);

        for (let path in repository) {
            for (let method in repository[path]) {
                for (let handlerName of repository[path][method]) {
                    (this.controller.router as any)[method](path, (req: Request, res: Response, next: NextFunction) => {
                        this.controller.req = req;
                        this.controller.res = res;
                        this.controller.next = next;

                        (this.controller as any)[handlerName]();
                    });
                }
            }
        }
    }

    private setupSubmodulesRouting(): void {
        for (let submodule of this.submoduleList) {
            this.controller.router.use('/' + submodule.folder.name, submodule.controller.router);
        }
    }
}