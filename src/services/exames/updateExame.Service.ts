import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { hash } from "bcryptjs";
import { appError } from "../../errors/appError";

const updateExamsService = async (id: string, updates: IExamUpdate) => {
  const usersRepository = AppDataSource.getRepository(User);
  const examsRepository = AppDataSource.getRepository(ExamesUserDoctor);
  const exam = await examsRepository.findOneBy({ id });

  const { doctor_id } = updates;

  if (doctor_id | updates.id) {
    throw new appError(
      401,
      `Update unauthorized of ${doctor_id} and ${updates.id}`
    );
  }

  const updateExam = await examsRepository.update(id, { ...updates });

  const { user_id, tipo_exame, data, hora, resultado } = exam!;

  const updatedConcluded = {
    user_id: user_id,
    tipo_exame: tipo_exame,
    data: data,
    hora: hora,
    resultado: resultado,
  };

  return updatedConcluded;
};

export default updateExamsService;
