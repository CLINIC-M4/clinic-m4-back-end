import AppDataSource from "../../data-source";
import { Schedule } from "../../entities/schedule.entity";
import { User } from "../../entities/user.entity";
import { Doctor } from "../../entities/doctor.entity";
import { IScheduleRequest } from "../../interfaces/schedules";
import { appError } from "../../errors/appError";
const createScheduleService = async (
  { doctorId, date, hour }: IScheduleRequest,
  id: string
): Promise<Schedule> => {
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
  if (Number(businessHours[0]) > 18 || Number(businessHours[0]) < 8) {
    throw new appError(400, "Cannot visit during business hours");
  }

  const verifyDay = new Date(date).getDay();
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

  return schedule;
};

export default createScheduleService;
