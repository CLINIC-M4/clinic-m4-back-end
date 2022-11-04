import { Request, Response } from "express";
import { IScheduleRequest } from "../../interfaces/schedules";
import updateScheduleService from "../../services/schedules/updateSchedule.service";

const updateScheduleController = async (req: Request, res: Response) => {
  const infoSchedule: IScheduleRequest = req.body;
  const scheduleId = req.params.id;
  await updateScheduleService(infoSchedule, scheduleId);
  return res.status(200).json({ message: "Update schedule" });
};

export { updateScheduleController };
