import AppDataSource from "../../data-source";
import { appError } from "../../errors/appError";
import { ExamesUserDoctor } from "../../entities/examesUserDoctor.entity";

const userListExamesService = async (id: string, idUser: String) => {
  const examRepository = AppDataSource.getRepository(ExamesUserDoctor);

  const exames = await examRepository.findOneBy({ id });

  if (idUser != exames?.user_id) {
    throw new appError(400, "Exam imcompatible with User");
  }

  if (exames == null || exames == undefined || !exames) {
    throw new appError(400, "Exam not found.");
  }
  return exames;
};

export default userListExamesService;
