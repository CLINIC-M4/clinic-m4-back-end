import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import { appError } from "./errors/appError";
import usersRouter from "./routes/users/user.routes"
import loginRouter from "./routes/users/login.routes"


const app = express();
app.use(express.json());
app.use("/users", usersRouter)
app.use("/login", loginRouter);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
    if (err instanceof appError) {
      return res
        .status(err.statusCode)
        .json({ 
         status: "error",
         message: err.message 
        });
    }
    console.error(err)
    return res.status(500).json({
      status: "error",
      message:"Internal server error"
    })
  });

export default app;