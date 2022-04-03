declare type MethodHandlerRepository = {
    [key: string]: string[];
};
declare type RoutingRepository = {
    [key: string]: MethodHandlerRepository;
};
export declare const controllerRoutingRepositoryMap: Map<any, RoutingRepository>;
export declare function All(path?: string): Function;
export declare function Get(path?: string): Function;
export declare function Post(path?: string): Function;
export declare function Patch(path?: string): Function;
export declare function Put(path?: string): Function;
export declare function Delete(path?: string): Function;
export {};
//# sourceMappingURL=routing.d.ts.map