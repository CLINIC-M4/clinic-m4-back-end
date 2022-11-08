import AppDataSource from "../../data-source";
import { Schedule } from "../../entities/schedule.entity";
import { User } from "../../entities/user.entity";
import { appError } from "../../errors/appError";
const listSchedulesService = async (id: string): Promise<Schedule[]> => {
  const schedulesRepository = AppDataSource.getRepository(Schedule);
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id });

  const where = !findUser ? { doctor: { id } } : { user: { id } };

  const schedules = await schedulesRepository.find({
    select: {
      id: true,
      date: true,
      hour: true,
      user: { name: true, email: true, cpf: true },
      doctor: { name: true, email: true, crm: true },
    },
    relations: { user: true, doctor: true },
    where: where,
  });

  if (schedules.length === 0) {
    throw new appError(404, "Schedules not found");
  }

  return schedules;
};

export default listSchedulesService;
