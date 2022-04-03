import { NextFunction, Request, Response, Router } from "express";
export declare abstract class Controller {
    static readonly router: Router;
    private $req?;
    private $res?;
    private $next?;
    get req(): Request;
    get res(): Response;
    get next(): NextFunction;
    set req(req: Request);
    set res(res: Response);
    set next(next: NextFunction);
}
//# sourceMappingURL=controller.d.ts.map