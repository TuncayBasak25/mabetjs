"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const express_1 = require("express");
class Controller {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    get req() {
        if (this.$req) {
            return this.$req;
        }
        throw new Error("The request property is not found.");
    }
    get res() {
        if (this.$res) {
            return this.$res;
        }
        throw new Error("The response property is not found.");
    }
    get next() {
        if (this.$next) {
            return this.$next;
        }
        throw new Error("The next property is not found.");
    }
    set req(req) {
        this.$req = req;
    }
    set res(res) {
        this.$res = res;
    }
    set next(next) {
        this.$next = next;
    }
}
exports.default = Controller;
exports.Controller = Controller;
