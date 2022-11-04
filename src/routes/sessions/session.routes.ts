import { Router } from "express";
import userLoginController from "../../controller/user/loginUser.controller";
import doctorLoginController from "../../controller/doctor/loginDoctor.controller";

const router = Router();

router.post("/login", userLoginController);
router.post("/login", doctorLoginController)

export default router;