type MethodHandlerRepository = { [key: string]: string[] };
type RoutingRepository = { [key: string]: MethodHandlerRepository };

export const controllerRoutingRepositoryMap: Map<any, RoutingRepository> = new Map<any, RoutingRepository>();

function MethodDecorator(method: string, path: string): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
        if (!controllerRoutingRepositoryMap.get(target.constructor)) {
            controllerRoutingRepositoryMap.set(target.constructor, {});
        }

        const pathMethodRepository = controllerRoutingRepositoryMap.get(target.constructor) as RoutingRepository;

        if (!pathMethodRepository[path]) {
            pathMethodRepository[path] = {};
        }

        if (!pathMethodRepository[path][method]) {
            pathMethodRepository[path][method] = [];
        }

        pathMethodRepository[path][method].push(propertyKey);
    }
}

export function All(path: string = ''): Function {
    return MethodDecorator('all', '/' + path);
}

export function Get(path: string = ''): Function {
    return MethodDecorator('get', '/' + path);
}

export function Post(path: string = ''): Function {
    return MethodDecorator('post', '/' + path);
}

export function Patch(path: string = ''): Function {
    return MethodDecorator('patch', '/' + path);
}

export function Put(path: string = ''): Function {
    return MethodDecorator('put', '/' + path);
}

export function Delete(path: string = ''): Function {
    return MethodDecorator('delete', '/' + path);
}
