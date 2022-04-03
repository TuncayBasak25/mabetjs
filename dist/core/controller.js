"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const express_1 = require("express");
class Controller {
    constructor() {
        this.router = (0, express_1.Router)();
    }
}
exports.Controller = Controller;
