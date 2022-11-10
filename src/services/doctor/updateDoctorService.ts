import AppDataSource from "../../data-source";
import { hash } from "bcryptjs";
import { appError } from "../../errors/appError";
import { Doctor } from "../../entities/doctor.entity";
import { IDoctorUpdate } from "../../interfaces/doctor/doctor";

const updateDoctorService = async (id: string, newData: IDoctorUpdate) => {
  const doctorsRepository = AppDataSource.getRepository(Doctor);
  const doctor = await doctorsRepository.findOneBy({ id });

  if (newData.isAdm !== undefined) {
    throw new appError(400, "Invalid input");
  }

  if (newData.isActive !== undefined) {
    throw new appError(400, "Invalid input");
  }

  if (newData.id !== undefined) {
    throw new appError(400, "Invalid input");
  }

  if (!doctor) {
    throw new appError(404, "User not found");
  }

  if (!newData.name && !newData.email && !newData.password) {
    return doctor;
  }

  if (newData.password) {
    newData.password = await hash(newData.password, 10);
  }

  const newDoc = await doctorsRepository.update(id, { ...newData });

  const newDoctorReq = await doctorsRepository.findOneBy({ id });
  const updateRes = {
    name: newDoctorReq!.name,
    email: newDoctorReq!.email,
    isAdm: newDoctorReq!.isAdm,
    isActive: newDoctorReq!.isActive,
    createdAt: newDoctorReq!.createdAt,
    updatedAt: new Date(),
  };

  return updateRes;
};

export default updateDoctorService;
