"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_1 = require("./routing");
const handler_1 = require("./handler");
class Module {
    constructor(folder) {
        var _a;
        this.folder = folder;
        this.moduleList = [];
        this.serviceList = [];
        this.importModules();
        this.importServices();
        const ControllerClass = (_a = this.folder.findFile({ basename: { include: ".controller." } })) === null || _a === void 0 ? void 0 : _a.require();
        if (!ControllerClass) {
            throw new Error("Every module has to include a controller.");
        }
        this.controller = new ControllerClass(...this.serviceList);
        this.setupRouting();
        this.setupSubmodulesRouting();
    }
    importModules() {
        const modulesFolder = this.folder.findFolder({ name: "modules" });
        if (!modulesFolder) {
            return;
        }
        for (let moduleFolder of modulesFolder.folderList) {
            this.moduleList.push(new Module(moduleFolder));
        }
    }
    importServices() {
        const servicesFolder = this.folder.findFolder({ name: "services" });
        if (!servicesFolder) {
            return;
        }
        for (let serviceModule of servicesFolder.contentList) {
            const Service = serviceModule.require();
            this.serviceList.push(new Service());
        }
    }
    setupRouting() {
        const repository = routing_1.controllerRoutingRepositoryMap.get(this.controller.constructor);
        for (let path in repository) {
            for (let method in repository[path]) {
                for (let handlerName of repository[path][method]) {
                    this.controller.router[method](path, (req, res, next) => {
                        this.controller[handlerName](new handler_1.Handler(req, res, next));
                    });
                }
            }
        }
    }
    setupSubmodulesRouting() {
        for (let module of this.moduleList) {
            this.controller.router.use('/' + module.folder.name, module.controller.router);
        }
    }
}
exports.default = Module;
