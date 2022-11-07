import AppDataSource from "../../data-source";
import { Doctor } from "../../entities/doctor.entity";
import { ExamesUserDoctor } from "../../entities/examesUserDoctor.entity";
import { User } from "../../entities/user.entity";
import { appError } from "../../errors/appError";

import { IExams } from "../../interfaces/exames/exames";

const registerExamService = async (
  { user_id, doctor_id, tipo_exame, data, hora, resultado }: IExams,
  id: string
) /*: Promise<IExams>*/ => {
  const examRepository = AppDataSource.getRepository(ExamesUserDoctor);
  const doctorRepository = AppDataSource.getRepository(Doctor);
  const doutor = await doctorRepository.findBy({ id });
  const userRepository = AppDataSource.getRepository(User);
  const usuario = await userRepository.findBy({ id: user_id });

  console.log(usuario);
  return usuario;
};

export default registerExamService;
