"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const explorer_1 = require("explorer");
const module_1 = __importDefault(require("./module"));
class App {
    constructor(sourceFolderPath) {
        this.sourceFolderPath = sourceFolderPath;
        this.server = (0, express_1.default)();
        this.PORT = process.env.PORT || "3000";
        this.folder = new explorer_1.Folder(this.sourceFolderPath);
        this.module = new module_1.default(this.folder);
        this.server.use('/', this.module.controller.router);
    }
    start() {
        this.server.listen(this.PORT, () => console.log("Listening on port " + this.PORT));
    }
}
exports.default = App;
exports.App = App;
