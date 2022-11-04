import usersRouter from "./users/user.routes";
import loginRouter from "./../routes/sessions/session.routes";
import doctorRouter from "./doctor/doctor.routes";
import scheduleRouter from "./schedules/schedule.routes";
import { Express } from "express";

export const initializerRouter = (app: Express) => {
  app.use("/users", usersRouter);
  app.use("/login", loginRouter);
  app.use("/doctor", doctorRouter);
  app.use("/schedules", scheduleRouter);
};
