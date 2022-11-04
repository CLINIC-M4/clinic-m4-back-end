import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Doctor } from "../../entities/doctor.entity";
import { IDoctorRegister } from "../../interface/doctor";

const registerDoctorService = async ({
  name,
  email,
  crm,
  telephone,
  password,
}: IDoctorRegister): Promise<IDoctorRegister> => {
  const doctorRepository = AppDataSource.getRepository(Doctor);

  const encrypt = await hash(password, 10);

  const newRegister = doctorRepository.create({
    name,
    email,
    crm,
    telephone,
    password: encrypt,
  });

  await doctorRepository.save(newRegister);

  return newRegister;
};

export default registerDoctorService;
