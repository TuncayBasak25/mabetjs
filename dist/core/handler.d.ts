import { NextFunction, Request, Response } from "express";
export declare class Handler {
    readonly req: Request;
    readonly res: Response;
    readonly next: NextFunction;
    constructor(req: Request, res: Response, next: NextFunction);
}
//# sourceMappingURL=handler.d.ts.map