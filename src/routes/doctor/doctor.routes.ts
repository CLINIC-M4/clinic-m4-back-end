import { Router } from "express";

import deleteDoctorController from "../../controller/doctor/deleteDoctor.controller";
import doctorUpdateController from "../../controller/doctor/doctorUpdate.Controller";
import listDoctorController from "../../controller/doctor/listDoctor.Controller";
import registerDoctorController from "../../controller/doctor/registerDoctor.Controller";

import ensureAuthMiddleware from "../../middleware/ensureAuth.middlewares";
import verifyEmail from "../../middleware/verifyEmail.Middlewares";
import verifyIsAdmMiddleware from "../../middleware/verifyIsAdm.middleware";

const router = Router();

router.post("", verifyEmail, registerDoctorController);
router.get("", ensureAuthMiddleware, verifyIsAdmMiddleware, listDoctorController);
router.patch("/:id", ensureAuthMiddleware, verifyIsAdmMiddleware, doctorUpdateController)
router.delete("/:id", ensureAuthMiddleware, verifyIsAdmMiddleware, deleteDoctorController)

export default router;
