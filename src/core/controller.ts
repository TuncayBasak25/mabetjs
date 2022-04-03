import { NextFunction, Request, Response, Router } from "express";


export abstract class Controller {
    public static readonly router: Router = Router();
    
    
    private $req?: Request;
    private $res?: Response;
    private $next?: NextFunction;

    public get req(): Request {
        if (this.$req) {
            return this.$req;
        }
        throw new Error("The request property is not found.")
    }

    public get res(): Response {
        if (this.$res) {
            return this.$res;
        }
        throw new Error("The response property is not found.")
    }

    public get next(): NextFunction {
        if (this.$next) {
            return this.$next;
        }
        throw new Error("The next property is not found.")
    }

    public set req(req: Request) {
        this.$req = req;
    }

    public set res(res: Response) {
        this.$res = res;
    }

    public set next(next: NextFunction) {
        this.$next = next;
    }
}