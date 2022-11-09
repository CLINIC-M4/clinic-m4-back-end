import AppDataSource from "../../data-source";
import { ExamesUserDoctor } from "../../entities/examesUserDoctor.entity";

const doctorListAllExamesServices = async (): Promise<ExamesUserDoctor[]> => {
  const examesRepository = AppDataSource.getRepository(ExamesUserDoctor);
  const exames = await examesRepository.find();

  return exames;
};

export default doctorListAllExamesServices;
