import { Request, Response } from "express";
import listUsersService from "../../services/users/listUserService";
import { instanceToPlain } from "class-transformer";

const listUserController = async (req: Request, res: Response) => {
  try {
    const listUsers = await listUsersService();
    return res.status(201).json(instanceToPlain(listUsers));
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default listUserController;
