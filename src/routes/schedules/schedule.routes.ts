import { Router } from "express";
import { createScheduleController } from "../../controller/schedules/createSchedule.controlller";
import { deleteScheduleController } from "../../controller/schedules/deleteSchedule.controller";
import { listOneScheduleController } from "../../controller/schedules/listOneSchedule.controller";
import { listSchedulesController } from "../../controller/schedules/listSchedules.controller";
import { updateScheduleController } from "../../controller/schedules/updateSchedule.controler";
import ensureAuthMiddleware from "../../middleware/ensureAuth.middlewares";
import validateSerializerMiddleware from "../../middleware/validateSerializer.middleware";
import { createScheduleSerializer, updateScheduleSerializer } from "../../serializers";

const router = Router();

router.post("", ensureAuthMiddleware,validateSerializerMiddleware(createScheduleSerializer), createScheduleController);
router.get("", ensureAuthMiddleware, listSchedulesController);
router.get("/:id", ensureAuthMiddleware, listOneScheduleController);
router.patch("/:id", ensureAuthMiddleware, validateSerializerMiddleware(updateScheduleSerializer), updateScheduleController);
router.delete("/:id", ensureAuthMiddleware, deleteScheduleController);

export default router;
