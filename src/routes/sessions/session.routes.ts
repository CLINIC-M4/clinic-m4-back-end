import { Router } from "express";
import userLoginController from "../../controller/user/loginUser.controller";
import doctorLoginController from "../../controller/doctor/loginDoctor.controller";

const router = Router();

router.post("/users", userLoginController);
router.post("/doctor", doctorLoginController)

export default router;