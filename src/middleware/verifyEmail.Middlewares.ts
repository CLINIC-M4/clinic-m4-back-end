import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Doctor } from "../entities/doctor.entity";

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const doctorRepository = AppDataSource.getRepository(Doctor);

  const validateEmail = await doctorRepository.findOneBy({
    email,
  });

  if (validateEmail) {
    return res.status(400).json({
      message: "This email is already in use",
    });
  }

  next();
};

export default verifyEmail;
