import AppDataSource from "../../data-source";
import { ExamesUserDoctor } from "../../entities/examesUserDoctor.entity";
import { IExams } from "../../interfaces/exames/exames";

const doctorListAllExamesServices = async (): Promise<IExams[]> => {
  const examesRepository = AppDataSource.getRepository(ExamesUserDoctor);
  const exames = await examesRepository.find();

  return exames;
};

export default doctorListAllExamesServices;
