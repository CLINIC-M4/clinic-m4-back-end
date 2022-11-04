import AppDataSource from "../../data-source";
import { Doctor } from "../../entities/doctor.entity";
import { User } from "../../entities/user.entity";

interface IMessage {
  message: string;
}

const deleteDoctorservice = async (id: string): Promise<IMessage> => {
  const doctorsRepository = AppDataSource.getRepository(Doctor);
  const doctor = await doctorsRepository.findOneBy({ id });

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  if (!doctor?.isActive) {
    throw new Error("This account is alredy inative");
  }

  doctor.isActive = false;
  await doctorsRepository.save(doctor);
  return { message: "Doctor deleted with success" };
};

export default deleteDoctorservice;
