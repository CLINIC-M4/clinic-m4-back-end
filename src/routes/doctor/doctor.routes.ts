import { Router } from "express";

import deleteDoctorController from "../../controller/doctor/deleteDoctor.controller";
import doctorUpdateController from "../../controller/doctor/doctorUpdate.Controller";
import listDoctorController from "../../controller/doctor/listDoctor.Controller";
import registerDoctorController from "../../controller/doctor/registerDoctor.Controller";
import registerExamController from "../../controller/exames/registerExam.controller";
import doctorListAllExamesController from "../../controller/exames/doctorListAllExams.controller";
import doctorListExamesController from "../../controller/exames/doctorListExames.controller";
import updateExamsController from "../../controller/exames/updateExames.Controller";

import ensureAuthMiddleware from "../../middleware/ensureAuth.middlewares";
import verifyEmail from "../../middleware/verifyEmail.Middlewares";
import verifyIsAdmMiddleware from "../../middleware/verifyIsAdm.middleware";

const router = Router();

router.post("", verifyEmail, registerDoctorController);
router.post(
  "/exams/register",
  ensureAuthMiddleware,
  // verifyIsAdmMiddleware,
  registerExamController
);

router.get(
  "",
  ensureAuthMiddleware,
  verifyIsAdmMiddleware,
  listDoctorController
);
router.get(
  "/exams",
  ensureAuthMiddleware,
  verifyIsAdmMiddleware,
  doctorListAllExamesController
);
router.get(
  "/exams/:id",
  ensureAuthMiddleware,
  verifyIsAdmMiddleware,
  doctorListExamesController
);
router.patch(
  "/:id",
  ensureAuthMiddleware,
  verifyIsAdmMiddleware,
  doctorUpdateController
);
router.patch(
  "/exams/update/:id",
  ensureAuthMiddleware,
  verifyIsAdmMiddleware,
  updateExamsController
);
router.delete(
  "/:id",
  ensureAuthMiddleware,
  verifyIsAdmMiddleware,
  deleteDoctorController
);

export default router;
