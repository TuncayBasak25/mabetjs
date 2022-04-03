import { NextFunction, Request, Response, Router } from "express";


export default abstract class Controller {
    public readonly router: Router = Router();
    
}