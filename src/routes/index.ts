import usersRouter from "./users/user.routes";
import doctorRouter from "./doctor/doctor.routes"
import { Express } from "express";

export const initializerRouter = (app: Express) => {
    app.use("/users", usersRouter);
    app.use("/doctor", doctorRouter);
}


