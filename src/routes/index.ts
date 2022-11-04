import usersRouter from "./users/user.routes";
import loginRouter from "./../routes/sessions/session.routes";
import doctorRouter from "./doctor/doctor.routes";
import scheduleRouter from "./schedules/schedule.routes";
import examesDoctor from "./exames/examesDoctor.routes";
import examesUser from "./exames/examesUser.routes";
import { Express } from "express";

export const initializerRouter = (app: Express) => {
  app.use("/users", usersRouter);
  app.use("/login", loginRouter);
  app.use("/doctor", doctorRouter);
  app.use("/schedules", scheduleRouter);
  app.use("/exames", examesDoctor);
  app.use("/exames", examesUser);
};
