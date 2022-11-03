import { Request, Response } from "express";
import createUserService from "../../services/users/createUserService";

const createUserController = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const newUser = await createUserService(user);
    const { password, ...rest } = newUser;
    return res.status(201).json(rest);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default createUserController;
