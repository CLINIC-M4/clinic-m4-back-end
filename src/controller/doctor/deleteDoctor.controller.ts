import { Request, Response } from "express";
import deleteDoctorservice from "../../services/doctor/deleteDoctorService";

const deleteDoctorController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletDoctor = await deleteDoctorservice(id);
    return res.status(200).send();
  } catch (err) {
    if (err instanceof Error) {
      const statusCode = err.message == "Doctor not found" ? 404 : 400;
      return res.status(statusCode).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default deleteDoctorController;
