import { NextFunction, Request, Response, Router } from "express";
export default abstract class Controller {
    private $req?;
    private $res?;
    private $next?;
    readonly router: Router;
    get req(): Request;
    get res(): Response;
    get next(): NextFunction;
    set req(req: Request);
    set res(res: Response);
    set next(next: NextFunction);
}
//# sourceMappingURL=controller.d.ts.map