import { Router } from "express";
import doctorListAllExamesController from "../../controller/exames/doctorListAllExams.controller";
import doctorListExamesController from "../../controller/exames/doctorListExames.controller";
import ensureAuthMiddleware from "../../middleware/ensureAuth.middlewares";
import verifyIsAdmMiddleware from "../../middleware/verifyIsAdm.middleware";

const router = Router();
router.get(
  "",
  ensureAuthMiddleware,
  verifyIsAdmMiddleware,
  doctorListAllExamesController
);
router.get(
  "/:id",
  ensureAuthMiddleware,
  verifyIsAdmMiddleware,
  doctorListExamesController
);

export default router;
