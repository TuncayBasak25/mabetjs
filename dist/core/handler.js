"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
class Handler {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }
}
exports.Handler = Handler;
