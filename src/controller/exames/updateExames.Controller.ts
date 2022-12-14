import { Request, Response } from "express";
import updateExamsService from "../../services/exames/updateExame.Service";

const updateExamsController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const updatedExam = await updateExamsService(id, updates);
  return res.json({
    message: "User updated",
    ...updatedExam,
  });
};

export default updateExamsController;
