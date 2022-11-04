import { Router } from "express";
import listDoctorController from "../../controller/doctor/listDoctor.Controller";
import doctorLoginController from "../../controller/doctor/loginDoctor.controller";
import registerDoctorController from "../../controller/doctor/registerDoctor.Controller";
import ensureAuthMiddleware from "../../middleware/ensureAuth.middlewares";
import verifyEmail from "../../middleware/verifyEmail.Middlewares";
import verifyIsAdmMiddleware from "../../middleware/verifyIsAdm.middleware";

const router = Router();

router.post("", verifyEmail, registerDoctorController);
router.post("/login", doctorLoginController)
router.get("", ensureAuthMiddleware, verifyIsAdmMiddleware, listDoctorController);

export default router;
