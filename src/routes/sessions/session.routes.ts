import { Router } from "express";
import userLoginController from "../../controller/user/loginUser.controller";
import doctorLoginController from "../../controller/doctor/loginDoctor.controller";
import validateSerializerMiddleware from "../../middleware/validateSerializer.middleware";
import { sessionUserSerializer } from "../../serializers";

const router = Router();

router.post(
  "/users",
  validateSerializerMiddleware(sessionUserSerializer),
  userLoginController
);
router.post(
  "/doctor",
  validateSerializerMiddleware(sessionUserSerializer),
  doctorLoginController
);

export default router;
