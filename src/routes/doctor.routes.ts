import { Router } from "express";
import listDoctorController from "../controller/listDoctor.Controller";
import registerDoctorController from "../controller/registerDoctor.Controller";
import verifyEmail from "../middlewares/verifyEmail.Middlewares";

export const router = Router();

router.post("", verifyEmail, registerDoctorController);
router.get("", listDoctorController);
