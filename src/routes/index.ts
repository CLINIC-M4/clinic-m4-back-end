import usersRouter from "./users/user.routes";
import loginRouter from "./users/login.routes";
import { Express } from "express";

export const initializerRouter = (app: Express) => {
    app.use("/users", usersRouter);
    app.use("/login", loginRouter);
}


