import mongoose from "mongoose";

const schedulesSchema = new mongoose.Schema({
    teacher: { type: String, required: true },
    roomType: { type: String, required: true },
    roomName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isFixed: { type: Boolean, required: true },
    studentEmployment: { type: String, required: true },
    group: { type: String, required: true },
    rec: { type: Boolean, required: true },
    reservad: { type: Boolean, required: true },
});

export default mongoose.model("schedules", schedulesSchema);