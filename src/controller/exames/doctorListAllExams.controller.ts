import { Request, Response } from "express";
import doctorListAllExamesServices from "../../services/exames/doctorListAllExamesService";

const doctorListAllExamesController = async (req: Request, res: Response) => {
  try {
    const listExames = await doctorListAllExamesServices();
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

export default doctorListAllExamesController;
