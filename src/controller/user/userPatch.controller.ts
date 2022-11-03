import { Request, Response } from "express";
import updateUserService from "../../services/users/updateUserService";

const updatedUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newData = req.body;
  const updateUser = await updateUserService(id, newData);
  return res.json({
    message: "User updated",
    ...updateUser,
  });
};

export default updatedUserController;
