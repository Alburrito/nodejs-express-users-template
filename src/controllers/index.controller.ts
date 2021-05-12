import { Request, Response } from "express";

class IndexController {

    public index (req: Request, res: Response) {
        res.render("index", { title: 'A sample web', errors: []});
    }

    public about (req: Request, res: Response) {
        res.render("about", { title: 'Sample about', errors: []});
    }

}

export const indexController = new IndexController();
