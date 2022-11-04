import AppDataSource from "../../data-source";
import { Schedule } from "../../entities/schedule.entity";
import { appError } from "../../errors/appError";
const deleteScheduleService = async (id: string): Promise<void> => {
  const scheduleRepository = AppDataSource.getRepository(Schedule);

  const findSchedule = await scheduleRepository.findOneBy({
    id,
  });

  if (!findSchedule) {
    throw new appError(404, "Schedule not found");
  }

  await scheduleRepository.delete(id);
};

export { deleteScheduleService };
