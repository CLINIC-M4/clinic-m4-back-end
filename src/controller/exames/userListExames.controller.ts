import { Request, Response } from "express";
import userListExamesService from "../../services/exames/userListExamesService";

const userListExamesController = async (req: Request, res: Response) => {
  try {
    const idUser = req.user.id;
    const id = req.params.id;
    const lisExames = await userListExamesService(id, idUser);
    return res.status(200).json(lisExames);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export default userListExamesController;
