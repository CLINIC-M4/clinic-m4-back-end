import AppDataSource from "../../data-source";
import { TipoExame } from "../../entities/exames.entity";
import { appError } from "../../errors/appError";

const doctorListExamesServices = async (id: string) => {
  const examsRepository = AppDataSource.getRepository(TipoExame);

  const exames = await examsRepository.findBy({ id });
  if (exames == null) {
    throw new appError(400, "Exam not found.");
  }

  return exames;
};

export default doctorListExamesServices;
