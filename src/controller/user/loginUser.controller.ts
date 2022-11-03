import userLoginService from "../../services/users/loginUserService";
import { Request, Response } from "express";

const userLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await userLoginService({ email, password });

    return res.status(200).json({ token });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(403).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default userLoginController;