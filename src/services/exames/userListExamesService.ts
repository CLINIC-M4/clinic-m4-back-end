import AppDataSource from "../../data-source";
import { appError } from "../../errors/appError";
import { ExamesUserDoctor } from "../../entities/examesUserDoctor.entity";
import { IExames } from "../../interfaces/exames/exames";

const userListExamesService = async (
  id: string,
  idUser: String
): Promise<IExames[]> => {
  const sameId = id == idUser;

  if (!sameId) {
    throw new appError(400, "Exam not found.");
  }
  const examRepository = AppDataSource.getRepository(ExamesUserDoctor);
  const exames = await examRepository.findBy({ id });
  if (exames == null || exames == undefined || !exames) {
    throw new appError(400, "Exam not found.");
  }
  return exames;
};

export default userListExamesService;
