import userLoginService from "../../services/users/loginUserService";
import { Request, Response } from "express";

const userLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userLogin = await userLoginService({ email, password });

    return res.status(200).json(userLogin);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(403).send({
        message: err.message,
      });
    }
  }
};

export default userLoginController;
