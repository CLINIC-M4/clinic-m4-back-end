import doctorLoginService from "../../services/doctor/loginDoctorService";
import { Request, Response } from "express";

const doctorLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const doctorLogin = await doctorLoginService({ email, password });

    return res.status(200).json(doctorLogin);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(403).send({
        message: err.message,
      });
    }
  }
};

export default doctorLoginController;
