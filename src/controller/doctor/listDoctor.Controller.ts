import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listDoctorService from "../../services/doctor/listDoctor.Service";

const listDoctorController = async (req: Request, res: Response) => {
  try {
    const registerList = await listDoctorService();
    return res.status(200).json(instanceToPlain(registerList));
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
};

export default listDoctorController;
