import usersRouter from "./users/user.routes";
import doctorRouter from "./doctor/doctor.routes";
import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../swagger.json";

export const initializerRouter = (app: Express) => {
  app.use("/users", usersRouter);
  app.use("/doctor", doctorRouter);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
