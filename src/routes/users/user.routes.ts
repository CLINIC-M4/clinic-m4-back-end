import { Router } from "express";
import createUserController from "../../controller/user/createUser.controller";
import deleteUserController from "../../controller/user/deleteUser.controller";
import listUserController from "../../controller/user/listUser.controler";
import updatedUserController from "../../controller/user/userPatch.controller";
import ensureAuthMiddleware from "../../middleware/ensureAuth.middlewares";
import verifyEmail from "../../middleware/verifyEmail.Middlewares";
import verifyIsAdmMiddleware from "../../middleware/verifyIsAdm.middleware";

const router = Router();

router.post("", verifyEmail, createUserController);
router.get("", ensureAuthMiddleware, verifyIsAdmMiddleware, listUserController);
router.patch(
  "/:id",
  ensureAuthMiddleware,
  verifyIsAdmMiddleware,
  updatedUserController
);
router.delete(
  "/:id",
  ensureAuthMiddleware,
  verifyIsAdmMiddleware,
  deleteUserController
);

export default router;
