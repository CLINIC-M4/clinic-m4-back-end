import { hash } from "bcryptjs";
import AppDataSource from "../data-source";
import { Doctor } from "../entities/doctor.entitie";
import { IDoctor } from "../interface/doctor";

const listDoctorService = async (): Promise<IDoctor[]> => {
  const doctorRepository = AppDataSource.getRepository(Doctor);
  const registerList = await doctorRepository.find();
  return registerList;
};

export default listDoctorService;
