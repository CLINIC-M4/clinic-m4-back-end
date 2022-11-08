import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUserervice";

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletUser = await deleteUserService(id);
    return res.status(200).send();
  } catch (err) {
    if (err instanceof Error) {
      const statusCode = err.message == "User not found" ? 404 : 400;
      return res.status(statusCode).send({
        message: err.message,
      });
    }
  }
};

export default deleteUserController;
