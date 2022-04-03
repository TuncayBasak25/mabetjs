"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_1 = require("./routing");
class Module {
    constructor(folder) {
        var _a;
        this.folder = folder;
        this.moduleList = [];
        this.serviceList = [];
        this.importModules();
        this.ControllerClass = (_a = this.folder.findFile({ basename: { end: ".controller.js" } })) === null || _a === void 0 ? void 0 : _a.require();
        if (!this.ControllerClass) {
            throw new Error("Every module has to include a controller.");
        }
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
    setupRouting() {
        const repository = routing_1.controllerRoutingRepositoryMap.get(this.ControllerClass);
        for (let path in repository) {
            for (let method in repository[path]) {
                for (let handlerName of repository[path][method]) {
                    this.ControllerClass.router[method](path, (req, res, next) => {
                        if (!("controller" in req)) {
                            Object.defineProperty(req, "controller", { value: new this.ControllerClass() });
                            req.controller.req = req;
                            req.controller.res = res;
                            req.controller.next = next;
                        }
                        req.controller[handlerName]();
                    });
                }
            }
        }
    }
    setupSubmodulesRouting() {
        for (let module of this.moduleList) {
            this.ControllerClass.router.use('/' + module.folder.name, module.ControllerClass.router);
        }
    }
}
exports.default = Module;
