import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { ExamesUserDoctor } from "../../entities/examesUserDoctor.entity";
import { IExamUpdate } from "../../interfaces/exames/exames";

const updateExamsService = async (id: string, updates: IExamUpdate) => {
  const usersRepository = AppDataSource.getRepository(User);
  const examsRepository = AppDataSource.getRepository(ExamesUserDoctor);

  const updateExam = await examsRepository.update(id, { ...updates });

  const exam = await examsRepository.findOneBy({ id });

  const { user, tipo_exame, data, hora, resultado } = exam!;

  const updatedConcluded = {
    user: user,
    tipo_exame: tipo_exame,
    data: data,
    hora: hora,
    resultado: resultado,
  };

  return updatedConcluded;
};

export default updateExamsService;
