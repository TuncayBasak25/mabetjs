import { NextFunction, Request, Response } from "express";
import { Folder } from "explorer";

import { Controller } from "./controller";
import { controllerRoutingRepositoryMap } from "./routing";

class HandlerParameters {
    public constructor(
        public readonly req: Request,
        public readonly res: Response,
        public readonly next: NextFunction
    ) {}
}

export default class Module {
    public readonly controller: Controller;
    public readonly moduleList: Module[] = [];
    public readonly serviceList: any[] = [];

    public constructor(public readonly folder: Folder) {
        this.importModules();

        this.importServices();

        const ControllerClass = this.folder.findFile({ name: "controller" })?.require();

        if (!ControllerClass) {
            throw new Error("Every module has to include a controller.");
        }

        this.controller = new ControllerClass(...this.serviceList);

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

    private importServices(): void {
        const servicesFolder = this.folder.findFolder({ name: "services" });

        if (!servicesFolder) {
            return;
        }

        for (let serviceModule of servicesFolder.contentList) {
            const Service = serviceModule.require();

            this.serviceList.push(new Service());
        }
    }

    private setupRouting(): void {
        const repository = controllerRoutingRepositoryMap.get(this.controller.constructor);

        for (let path in repository) {
            for (let method in repository[path]) {
                for (let handlerName of repository[path][method]) {
                    (this.controller.router as any)[method](path, (req: Request, res: Response, next: NextFunction) => {

                        (this.controller as any)[handlerName](new HandlerParameters(req, res, next));
    
                    });
                }
            }
        }
    }

    private setupSubmodulesRouting(): void {
        for (let module of this.moduleList) {
            this.controller.router.use('/' + module.folder.name, module.controller.router);
        }
    }
}