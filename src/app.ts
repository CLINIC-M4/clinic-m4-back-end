import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger.json";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default app;
