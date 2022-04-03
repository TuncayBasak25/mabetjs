import { NextFunction, Request, Response, Router } from "express";
import { Folder, File } from "explorer";

import { Controller } from "./controller";
import { controllerRoutingRepositoryMap } from "./routing";


export default class Module {
    public readonly ControllerClass: any;
    public readonly moduleList: Module[] = [];
    public readonly serviceList: any[] = [];

    public constructor(public readonly folder: Folder) {
        this.importModules();

        this.ControllerClass = this.folder.findFile({ basename: { end: ".controller.js"} })?.require();

        if (!this.ControllerClass) {
            throw new Error("Every module has to include a controller.");
        }


        this.setupRouting();

        this.setupSubmodulesRouting();
    }

    private importModules(): void {
        const modulesFolder = this.folder.findFolder({ name: "modules" });

        if (!modulesFolder) {
            return;
        }
        
        for (let moduleFolder of modulesFolder.folderList) {
            this.moduleList.push(new Module(moduleFolder));
        }
    }

    private setupRouting(): void {
        const repository = controllerRoutingRepositoryMap.get(this.ControllerClass);

        for (let path in repository) {
            for (let method in repository[path]) {
                for (let handlerName of repository[path][method]) {
                    (this.ControllerClass.router as any)[method](path, (req: Request, res: Response, next: NextFunction) => {

                        const controller = new this.ControllerClass();

                        controller.req = req;
                        controller.res = res;
                        controller.next = next;

                        (controller as any)[handlerName]();
    
                    });
                }
            }
        }
    }

    private setupSubmodulesRouting(): void {
        for (let module of this.moduleList) {
            this.ControllerClass.router.use('/' + module.folder.name, module.ControllerClass.router);
        }
    }
}