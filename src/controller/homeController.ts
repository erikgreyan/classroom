import { Request, Response, NextFunction } from "express";

class HomeController {
    async homePage(req: Request, res: Response, next: NextFunction) {
        try {
            res.render("index");
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default new HomeController();