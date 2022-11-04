import { Router } from "express";
import userListExamesController from "../../controller/exames/userListExames.controller";
import ensureAuthMiddleware from "../../middleware/ensureAuth.middlewares";

const router = Router();

router.get("/:id", ensureAuthMiddleware, userListExamesController);

export default router;
