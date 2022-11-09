import AppDataSource from "../../data-source";
import { Schedule } from "../../entities/schedule.entity";
import { appError } from "../../errors/appError";
import {
  IScheduleResponse,
  IScheduleRequest,
} from "../../interfaces/schedules";

const updateScheduleService = async (
  { date, hour }: IScheduleRequest,
  id: string
): Promise<IScheduleResponse> => {
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
  if (
    Number(businessHours[0]) > 18 ||
    Number(businessHours[0]) < 8 ||
    (Number(businessHours[0]) === 18 && Number(businessHours[1]) !== 0)
  ) {
    throw new appError(400, "Cannot visit during business hours");
  }
  if (Number(businessHours[1]) < 0 || Number(businessHours[1]) > 60) {
    throw new appError(400, "Minutes invalid");
  }

  const data = new Date(date);
  const verifyDate = String(data);
  if (verifyDate == "Invalid Date") {
    throw new appError(
      400,
      "Date in wrong format, correct format is mm/dd/yyyy"
    );
  }

  const verifyDay = new Date(date).getDay();
  if (verifyDay < 1 || verifyDay > 5) {
    throw new appError(400, "Appointments can only be made on weekdays");
  }

  await scheduleRepository.update(id, {
    date,
    hour,
  });

  const schedule = await scheduleRepository.findOne({
    select: {
      id: true,
      date: true,
      hour: true,
      user: { name: true, email: true, cpf: true },
      doctor: { name: true, email: true, crm: true },
    },
    relations: { user: true, doctor: true },
    where: { id: id },
  });

  if (!schedule) {
    throw new appError(400, "Error update schedule");
  }

  return schedule;
};

export default updateScheduleService;
