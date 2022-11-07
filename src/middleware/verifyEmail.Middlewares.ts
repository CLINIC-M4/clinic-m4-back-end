import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Doctor } from "../entities/doctor.entity";
import { User } from "../entities/user.entity";

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (req.baseUrl === "/doctor") {
    const doctorRepository = AppDataSource.getRepository(Doctor);
    const validateEmail = await doctorRepository.findOneBy({
      email: email,
    });
    if (validateEmail) {
      return res.status(409).json({
        message: "This email is already in use",
      });
    }
  }

  if (req.baseUrl === "/users") {
    const doctorRepository = AppDataSource.getRepository(User);
    const validateEmail = await doctorRepository.findOneBy({
      email: email,
    });
    if (validateEmail) {
      return res.status(409).json({
        message: "This email is already in use",
      });
    }
  }

  next();
};

export default verifyEmail;
