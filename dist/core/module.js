"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_1 = require("./routing");
class Module {
    constructor(folder) {
        var _a;
        this.folder = folder;
        this.submoduleList = [];
        this.serviceList = [];
        this.setupSubmodules();
        this.setupServices();
        const ControllerClass = (_a = this.folder.getFileIncluding("controller")) === null || _a === void 0 ? void 0 : _a.require();
        if (!ControllerClass) {
            throw new Error("Every module has to include a controller.");
        }
        this.controller = new ControllerClass(...this.serviceList);
        this.setupRouting();
        this.setupSubmodulesRouting();
    }
    setupSubmodules() {
        const submodulesFolder = this.folder.subfolders.submodules;
        if ((submodulesFolder === null || submodulesFolder === void 0 ? void 0 : submodulesFolder.subfolderList.length) > 0) {
            for (let submoduleFolder of submodulesFolder.subfolderList) {
                this.submoduleList.push(new Module(submoduleFolder));
            }
        }
    }
    setupServices() {
        if (this.folder.subfolders.services) {
            for (let serviceFile of this.folder.subfolders.services.fileList) {
                const Service = serviceFile.require();
                this.serviceList.push(new Service());
            }
        }
    }
    setupRouting() {
        const repository = routing_1.controllerRoutingRepositoryMap.get(this.controller.constructor);
        for (let path in repository) {
            for (let method in repository[path]) {
                for (let handlerName of repository[path][method]) {
                    this.controller.router[method](path, (req, res, next) => {
                        this.controller.req = req;
                        this.controller.res = res;
                        this.controller.next = next;
                        this.controller[handlerName]();
                    });
                }
            }
        }
    }
    setupSubmodulesRouting() {
        for (let submodule of this.submoduleList) {
            this.controller.router.use('/' + submodule.folder.name, submodule.controller.router);
        }
    }
}
exports.default = Module;
