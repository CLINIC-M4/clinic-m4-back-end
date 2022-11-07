import { Request, Response } from "express";
import listOneScheduleService from "../../services/schedules/listOneSchedule.sevice";

const listOneScheduleController = async (req: Request, res: Response) => {
  const scheduleId = req.params.id;
  const schedule = await listOneScheduleService(scheduleId);
  return res.status(200).json(schedule);
};

export { listOneScheduleController };
