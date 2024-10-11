import schedulesModel from "../models/schedulesModel";

class SchedulesServices {
    async allBooking({ roomType, roomName }) {
        const schedules = await schedulesModel.find({
            roomType: roomType,
            roomName: roomName
        });
        return schedules;
    }
}

export default new SchedulesServices();