import { Router } from "express";
const router = Router();
// ------ Controllers ------
import schedulesController from "../controller/schedulesController";

router.get("/", 
    schedulesController.allBooking
);

export default router;