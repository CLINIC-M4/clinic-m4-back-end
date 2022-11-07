import { Request, Response } from "express";

import registerExamService from "../../services/doctor/registerExamService";

const registerExamController = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const id = req.user.id;
    const createdExam = await registerExamService(body, id);
    return res.status(200).json(createdExam);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export default registerExamController;
