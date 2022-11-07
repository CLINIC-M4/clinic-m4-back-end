import AppDataSource from "../../data-source";
import { ExamesUserDoctor } from "../../entities/examesUserDoctor.entity";
import { IExames } from "../../interfaces/exames/exames";

const doctorListAllExamesServices = async (): Promise<IExames[]> => {
  const examesRepository = AppDataSource.getRepository(ExamesUserDoctor);
  const exames = await examesRepository.find();

  return exames;
};

export default doctorListAllExamesServices;
