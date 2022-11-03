import { Request, Response } from "express";
import registerDoctorService from "../service/registerDoctor.Service";

const registerDoctorController = async (req: Request, res: Response) => {
  try {
    const registerRequest = req.body;
    const newRegister = await registerDoctorService(registerRequest);
    const { password, ...rest } = newRegister;
    return res.status(201).json(rest);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
};

export default registerDoctorController;
