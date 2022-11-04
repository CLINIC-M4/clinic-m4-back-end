import { Router } from "express";
import { createScheduleController } from "../../controller/schedules/createSchedule.controlller";
import { deleteScheduleController } from "../../controller/schedules/deleteSchedule.controller";
import { listSchedulesController } from "../../controller/schedules/listSchedules.controller";
import { updateScheduleController } from "../../controller/schedules/updateSchedule.controler";
import ensureAuthMiddleware from "../../middleware/ensureAuth.middlewares";
import verifyIsAdmMiddleware from "../../middleware/verifyIsAdm.middleware";

const router = Router();

router.post("", ensureAuthMiddleware, createScheduleController);
router.get("", ensureAuthMiddleware, listSchedulesController);
router.patch("/:id", ensureAuthMiddleware, updateScheduleController);
router.delete("/:id", ensureAuthMiddleware, deleteScheduleController);

export default router;
