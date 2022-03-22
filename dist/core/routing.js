"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Put = exports.Patch = exports.Post = exports.Get = exports.All = exports.controllerRoutingRepositoryMap = void 0;
exports.controllerRoutingRepositoryMap = new Map();
function MethodDecorator(method, path) {
    return function (target, propertyKey, descriptor) {
        if (!exports.controllerRoutingRepositoryMap.get(target.constructor)) {
            exports.controllerRoutingRepositoryMap.set(target.constructor, {});
        }
        const pathMethodRepository = exports.controllerRoutingRepositoryMap.get(target.constructor);
        if (!pathMethodRepository[path]) {
            pathMethodRepository[path] = {};
        }
        if (!pathMethodRepository[path][method]) {
            pathMethodRepository[path][method] = [];
        }
        pathMethodRepository[path][method].push(propertyKey);
    };
}
function All(path = '') {
    return MethodDecorator('all', '/' + path);
}
exports.All = All;
function Get(path = '') {
    return MethodDecorator('get', '/' + path);
}
exports.Get = Get;
function Post(path = '') {
    return MethodDecorator('post', '/' + path);
}
exports.Post = Post;
function Patch(path = '') {
    return MethodDecorator('patch', '/' + path);
}
exports.Patch = Patch;
function Put(path = '') {
    return MethodDecorator('put', '/' + path);
}
exports.Put = Put;
function Delete(path = '') {
    return MethodDecorator('delete', '/' + path);
}
exports.Delete = Delete;
