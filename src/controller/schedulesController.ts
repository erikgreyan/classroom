import { Request, Response, NextFunction } from "express";
// ------ Services ------
import schedulesServices from "../services/schedulesServices";

class SchedulesController {
    async allBooking(req: Request, res: Response, next: NextFunction) {
        try {

            const { roomType, roomName } = req.query;
            const schedules = await schedulesServices.allBooking({ roomType, roomName });

            return res.status(200).json({
                message: "All schedules",
                status: "success",
                data: schedules
            })
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}

export default new SchedulesController();