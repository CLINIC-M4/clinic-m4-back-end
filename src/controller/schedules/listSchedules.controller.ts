import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listSchedulesService from "../../services/schedules/listSchedules.service";

const listSchedulesController = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const schedules = await listSchedulesService(userId);
  return res.status(200).json(instanceToPlain(schedules));
};

export { listSchedulesController };
