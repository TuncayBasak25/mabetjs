import { NextFunction, Request, Response } from "express";

export class Handler {
    public constructor(
        public readonly req: Request,
        public readonly res: Response,
        public readonly next: NextFunction
    ) { }
}