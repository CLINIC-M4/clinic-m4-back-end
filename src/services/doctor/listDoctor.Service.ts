import AppDataSource from "../../data-source";
import { Doctor } from "../../entities/doctor.entity";
import { IDoctor } from "../../interfaces/doctor/doctor";

const listDoctorService = async (): Promise<IDoctor[]> => {
  const doctorRepository = AppDataSource.getRepository(Doctor);
  const registerList = await doctorRepository.find();
  return registerList;
};

export default listDoctorService;
