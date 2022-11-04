import AppDataSource from "../../data-source";
import { Schedule } from "../../entities/schedule.entity";
import { appError } from "../../errors/appError";
const listSchedulesService = async (id: string): Promise<Schedule[]> => {
  const schedulesRepository = AppDataSource.getRepository(Schedule);

  const schedules = await schedulesRepository.find({
    where: { user: { id } },
    relations: { user: true, doctor: true },
  });

  if (schedules.length === 0) {
    throw new appError(404, "Schedules not found");
  }

  return schedules;
};

export default listSchedulesService;
