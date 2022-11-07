import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";
import { appError } from "../errors/appError";

const validateSerializerMiddleware =
  (serializer: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await serializer.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

      return next();
    } catch (error) {
      const { errors } = error as ValidationError;
      throw new appError(400, `${errors[0]}`);
    }
  };

export default validateSerializerMiddleware;
