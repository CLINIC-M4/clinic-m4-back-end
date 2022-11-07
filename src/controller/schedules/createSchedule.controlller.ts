import { Request, Response } from "express";
import { IScheduleRequest } from "../../interfaces/schedules";
import createScheduleService from "../../services/schedules/createSchedule.service";

const createScheduleController = async (req: Request, res: Response) => {
  const infoSchedule: IScheduleRequest = req.body;
  const userId = req.user.id;
  const schedule = await createScheduleService(infoSchedule, userId);

  return res.status(201).json({ message: "Created schedule", schedule: schedule });
};

export { createScheduleController };
