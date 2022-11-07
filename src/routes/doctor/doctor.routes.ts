import { Router } from "express";

import deleteDoctorController from "../../controller/doctor/deleteDoctor.controller";
import doctorUpdateController from "../../controller/doctor/doctorUpdate.Controller";
import listDoctorController from "../../controller/doctor/listDoctor.Controller";
import registerDoctorController from "../../controller/doctor/registerDoctor.Controller";
import registerExamController from "../../controller/doctor/registerExam.controller";

import ensureAuthMiddleware from "../../middleware/ensureAuth.middlewares";
import verifyEmail from "../../middleware/verifyEmail.Middlewares";
import verifyIsAdmMiddleware from "../../middleware/verifyIsAdm.middleware";

const router = Router();

router.post("", verifyEmail, registerDoctorController);
router.post(
  "/exames/register",
  ensureAuthMiddleware,
  verifyIsAdmMiddleware,
  registerExamController
);

router.get(
  "",
  ensureAuthMiddleware,
  verifyIsAdmMiddleware,
  listDoctorController
);
router.patch(
  "/:id",
  ensureAuthMiddleware,
  verifyIsAdmMiddleware,
  doctorUpdateController
);
router.patch(
  "/exames/update/:id",
  ensureAuthMiddleware,
  verifyIsAdmMiddleware,
  updateExamesController
);
router.delete(
  "/:id",
  ensureAuthMiddleware,
  verifyIsAdmMiddleware,
  deleteDoctorController
);

export default router;
