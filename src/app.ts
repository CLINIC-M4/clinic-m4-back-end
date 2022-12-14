import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import { appError } from "./errors/appError";
import { initializerRouter } from "./routes/";

const app = express();

app.use(express.json());

initializerRouter(app);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof appError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
  return res.status(500).json({
    message: "Internal server error",
  });
});

export default app;
