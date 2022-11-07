import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserUpdate } from "../../interfaces/users";
import { hash } from "bcryptjs";
import { appError } from "../../errors/appError";

const updateUserService = async (id: string, newData: IUserUpdate) => {
  const usersRepository = AppDataSource.getRepository(User);
  const user = await usersRepository.findOneBy({ id });

  if (newData.isAdm !== undefined) {
    throw new appError(400, "Invalid input");
  }

  if (newData.isActive !== undefined) {
    throw new appError(400, "Invalid input");
  }

  if (newData.id !== undefined) {
    throw new appError(400, "Invalid input");
  }

  if (!user) {
    throw new appError(404, "User not found");
  }

  if (!newData.name && !newData.email && !newData.password) {
    return user;
  }

  if (newData.password) {
    newData.password = await hash(newData.password, 10);
  }

  const newUser = await usersRepository.update(id, { ...newData });

  const newUserReq = await usersRepository.findOneBy({ id });
  const updateRes = {
    name: newUserReq!.name,
    email: newUserReq!.email,
    isAdm: newUserReq!.isAdm,
    isActive: newUserReq!.isActive,
    createdAt: newUserReq!.createdAt,
    updatedAt: new Date(),
  };

  return updateRes;
};

export default updateUserService;
