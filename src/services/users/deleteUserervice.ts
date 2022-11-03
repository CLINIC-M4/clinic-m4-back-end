import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

interface IMessage {
  message: string;
}

const deleteUserService = async (id: string): Promise<IMessage> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.findOneBy({ id });

  if (!users) {
    throw new Error("User not found");
  }

  if (!users?.isActive) {
    throw new Error("This account is alredy inative");
  }

  users.isActive = false;
  await userRepository.save(users);
  return { message: "User deleted with success" };
};

export default deleteUserService;
