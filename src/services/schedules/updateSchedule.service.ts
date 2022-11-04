import AppDataSource from "../../data-source";
import { Schedule } from "../../entities/schedule.entity";
import { appError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";

const updateScheduleService = async (
  { date, hour }: IScheduleRequest,
  id: string
): Promise<Schedule | null> => {
  if (!date || !hour) {
    throw new appError(400, "Missing body informations");
  }

  const scheduleRepository = AppDataSource.getRepository(Schedule);

  const existingSchedule = await scheduleRepository.findOneBy({ id });
  if (!existingSchedule) {
    throw new appError(404, "Schedule not found");
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

  await scheduleRepository.update(id, {
    date,
    hour,
  });

  const schedule = await scheduleRepository.findOneBy({ id });

  return schedule;
};

export default updateScheduleService;
