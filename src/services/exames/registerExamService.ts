import AppDataSource from "../../data-source";
import { Doctor } from "../../entities/doctor.entity";
import { ExamesUserDoctor } from "../../entities/examesUserDoctor.entity";
import { User } from "../../entities/user.entity";
import { appError } from "../../errors/appError";

import { IExams } from "../../interfaces/exames/exames";

const registerExamService = async (
  { user_id, tipo_exame, data, hora, resultado }: IExams,
  id: string
): Promise<IExams> => {
  const examRepository = AppDataSource.getRepository(ExamesUserDoctor);

  const doctorRepository = AppDataSource.getRepository(Doctor);
  const doctor = await doctorRepository.findOneBy({ id });

  const userRepository = AppDataSource.getRepository(User);
  const usuario = await userRepository.findOneBy(user_id.user_id);

  if (usuario == null || usuario == undefined || !usuario) {
    throw new appError(400, "User not found");
  }

  const newExame = examRepository.create({
    doctor_id: {
      name: doctor!.name,
      crm: doctor!.crm,
    },
    user_id: {
      name: usuario!.name,
      cpf: usuario!.cpf,
    },
    tipo_exame,
    data,
    hora,
    resultado,
  });

  await examRepository.save(newExame);

  return newExame;
};

export default registerExamService;
