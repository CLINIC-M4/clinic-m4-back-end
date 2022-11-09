import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Doctor } from "../../entities/doctor.entity";
import { appError } from "../../errors/appError";
import { IDoctorRegister } from "../../interfaces/doctor/doctor";

const registerDoctorService = async ({
  name,
  email,
  crm,
  password,
}: IDoctorRegister): Promise<IDoctorRegister> => {
  const doctorRepository = AppDataSource.getRepository(Doctor);

  const findCrm = await doctorRepository.findOneBy({ crm });
  if (findCrm) {
    throw new appError(400, "This CRM is already in use");
  }

  const encrypt = await hash(password, 10);

  const newRegister = doctorRepository.create({
    name,
    email,
    crm,
    password: encrypt,
  });

  await doctorRepository.save(newRegister);

  return newRegister;
};

export default registerDoctorService;
