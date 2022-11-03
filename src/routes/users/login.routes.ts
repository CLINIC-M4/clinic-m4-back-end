import { Router } from "express";
import userLoginController from "../../controller/user/loginUser.controller";

const router = Router();
router.post("", userLoginController);

export default router;
