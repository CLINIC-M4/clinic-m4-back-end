import { Request, Response } from "express";
import doctorListExamesServices from "../../services/exames/doctorListExamesServices";

const doctorListExamesController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const listExames = await doctorListExamesServices(id);
    return res.status(200).json(listExames);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export default doctorListExamesController;
