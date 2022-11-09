import AppDataSource from "../../data-source";
import { Doctor } from "../../entities/doctor.entity";
import { ExamesUserDoctor } from "../../entities/examesUserDoctor.entity";
import { User } from "../../entities/user.entity";
import { appError } from "../../errors/appError";

import { IExams } from "../../interfaces/exames/exames";

const registerExamService = async (
  { user_id, tipo_exame, data, hora, resultado }: IExams,
  id: string
) => {
  const examRepository = AppDataSource.getRepository(ExamesUserDoctor);

  const doctorRepository = AppDataSource.getRepository(Doctor);
  const doctor = await doctorRepository.findOneBy({ id });
  if (!doctor) {
    throw new appError(400, "Doctor not found");
  }
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: user_id });

  if (!user) {
    throw new appError(400, "User not found");
  }

  const exame = examRepository.create({
    doctor,
    user,
    tipo_exame,
    data,
    hora,
    resultado,
  });

  const exameSave = await examRepository.save(exame);

  const newExame = {
    id: exameSave.id,
    doctor: {
      name: doctor.name,
      crm: doctor.crm,
    },
    user: {
      name: user.name,
      cpf: user.cpf,
    },
    tipo_exame,
    data,
    hora,
    resultado,
  };

  return newExame;
};

export default registerExamService;
