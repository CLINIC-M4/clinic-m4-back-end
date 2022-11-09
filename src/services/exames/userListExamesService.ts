import AppDataSource from "../../data-source";
import { appError } from "../../errors/appError";
import { ExamesUserDoctor } from "../../entities/examesUserDoctor.entity";

const userListExamesService = async (id: string) => {
  const examRepository = AppDataSource.getRepository(ExamesUserDoctor);

  const exames = await examRepository.find({
    select: {
      id: true,
      data: true,
      hora: true,
      tipo_exame: true,
      resultado: true,
      user: { name: true, email: true, cpf: true },
      doctor: { name: true, email: true, crm: true },
    },
    relations: { user: true, doctor: true },
    where: { user: { id } },
  });

  if (!exames) {
    throw new appError(400, "Exam imcompatible with User");
  }

  if (exames == null || exames == undefined || !exames) {
    throw new appError(400, "Exam not found.");
  }
  return exames;
};

export default userListExamesService;
