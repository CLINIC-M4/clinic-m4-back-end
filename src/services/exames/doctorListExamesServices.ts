import AppDataSource from "../../data-source";
import { ExamesUserDoctor } from "../../entities/examesUserDoctor.entity";
import { appError } from "../../errors/appError";

const doctorListExamesServices = async (
  id: string
): Promise<ExamesUserDoctor[]> => {
  const examsRepository = AppDataSource.getRepository(ExamesUserDoctor);
  const exames = await examsRepository.findBy({ id });
  if (exames == null || exames == undefined || !exames) {
    throw new appError(400, "Exam not found.");
  }

  return exames;
};

export default doctorListExamesServices;
