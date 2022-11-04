import { Request, Response } from "express";
import { deleteScheduleService } from "../../services/schedules/deleteSchedule.service";

const deleteScheduleController = async (req: Request, res: Response) => {
  const scheduleId = req.params.id;
  await deleteScheduleService(scheduleId);
  return res.status(204).json({ message: "Delete schedule" });
};

export { deleteScheduleController };
