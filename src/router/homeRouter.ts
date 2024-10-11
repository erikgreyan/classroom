import { Router } from "express";
const router = Router();
// ------ Controllers ------
import homeController from "../controller/homeController";

router.get("/", homeController.homePage);

export default router;