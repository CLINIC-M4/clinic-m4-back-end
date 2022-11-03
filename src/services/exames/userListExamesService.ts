import AppDataSource from "../../data-source";
import { appError } from "../../errors/appError";
import { TipoExame } from "../../entities/exames.entity";

const userListExamesService = async (id: string) => {
  const examRepository = AppDataSource.getRepository(TipoExame);
  const exames = await examRepository.findBy({ id });
  if (exames == null) {
    throw new appError(400, "Exam not found.");
  }
  return exames;
};

export default userListExamesService;
