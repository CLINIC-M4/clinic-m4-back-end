import { Router } from "express";
import listDoctorController from "../../controller/doctor/listDoctor.Controller";
import registerDoctorController from "../../controller/doctor/registerDoctor.Controller";
import verifyEmail from "../../middlewares/verifyEmail.Middlewares";

const router = Router();

router.post("", verifyEmail, registerDoctorController);
router.get("", listDoctorController);

export default router;
