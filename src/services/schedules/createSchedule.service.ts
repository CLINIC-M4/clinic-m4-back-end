import AppDataSource from "../../data-source";
import { Schedule } from "../../entities/schedule.entity";
import { User } from "../../entities/user.entity";
import { Doctor } from "../../entities/doctor.entity";
import {
  IScheduleRequest,
  IScheduleResponse,
} from "../../interfaces/schedules";
import { appError } from "../../errors/appError";
const createScheduleService = async (
  { doctorId, date, hour }: IScheduleRequest,
  id: string
): Promise<IScheduleResponse> => {
  if (!date || !hour || !doctorId) {
    throw new appError(400, "Missing body informations");
  }

  const userRepository = AppDataSource.getRepository(User);
  const doctorRepository = AppDataSource.getRepository(Doctor);
  const scheduleRepository = AppDataSource.getRepository(Schedule);

  const user = await userRepository.findOneBy({ id });
  if (!user) {
    throw new appError(404, "User id invalid");
  }

  if (user.isActive === false) {
    throw new appError(400, "This account was deleted");
  }

  const doctor = await doctorRepository.findOneBy({ id: doctorId });
  if (!doctor) {
    throw new appError(404, "Doctor id Invalid");
  }

  const findSchedule = await scheduleRepository.findOneBy({
    hour: hour,
    date: date,
  });
  if (findSchedule) {
    throw new appError(400, "Already scheduled time and date");
  }

  const businessHours = hour.split(":");
  if (Number(businessHours[0]) > 17 || Number(businessHours[0]) < 8) {
    throw new appError(400, "Cannot visit during business hours");
  }

  const data = new Date(date);
  console.log(data);
  const verifyDate = String(data);
  if (verifyDate == "Invalid Date") {
    throw new appError(
      400,
      "Date in wrong format, correct format is mm/dd/yyyy"
    );
  }

  const verifyDay = data.getDay();
  if (verifyDay < 1 || verifyDay > 5) {
    throw new appError(400, "Appointments can only be made on weekdays");
  }

  const schedule = scheduleRepository.create({
    date,
    hour,
    user,
    doctor,
  });

  await scheduleRepository.save(schedule);

  const responseSchedule = {
    id: schedule.id,
    date: schedule.date,
    hour: schedule.hour,
    user: {
      name: schedule.user.name,
      email: schedule.user.email,
      cpf: schedule.user.cpf,
    },
    doctor: {
      name: schedule.doctor.name,
      email: schedule.doctor.email,
      crm: schedule.doctor.crm,
    },
  };

  return responseSchedule;
};

export default createScheduleService;
