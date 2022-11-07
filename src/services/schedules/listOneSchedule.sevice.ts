import AppDataSource from "../../data-source";
import { Schedule } from "../../entities/schedule.entity";
import { appError } from "../../errors/appError";
const listOneScheduleService = async (id: string): Promise<Schedule> => {
  const schedulesRepository = AppDataSource.getRepository(Schedule);

  const schedules = await schedulesRepository.findOne({
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

  if (!schedules) {
    throw new appError(404, "Schedules not found");
  }

  return schedules;
};

export default listOneScheduleService;
