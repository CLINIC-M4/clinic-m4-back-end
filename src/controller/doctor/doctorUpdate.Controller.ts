import { Request, Response } from "express";
import updateDoctorService from "../../services/doctor/updateDoctorService";

const doctorUpdateController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const newData = req.body;
    const updateUser = await updateDoctorService(id, newData);
    return res.json({
      message: "User updated",
      ...updateUser,
    });
  };
  
  export default doctorUpdateController;