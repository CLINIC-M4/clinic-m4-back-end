import { Router } from "express";
import createUserController from "../../controller/user/createUser.controller";
import deleteUserController from "../../controller/user/deleteUser.controller";
import listUserController from "../../controller/user/listUser.controler";
import userLoginController from "../../controller/user/loginUser.controller";
import updatedUserController from "../../controller/user/userPatch.controller";
import ensureAuthMiddleware from "../../middleware/ensureAuth.middlewares";
import verifyIsAdmMiddleware from "../../middleware/verifyIsAdm.middleware";

const router = Router();

router.post("", createUserController);
router.post("/login", userLoginController);
router.get("", ensureAuthMiddleware, verifyIsAdmMiddleware, listUserController);
router.patch("/:id",ensureAuthMiddleware, verifyIsAdmMiddleware,updatedUserController)
router.delete("/:id",ensureAuthMiddleware,verifyIsAdmMiddleware, deleteUserController)


export default router;
