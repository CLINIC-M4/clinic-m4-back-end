import AppDataSource from "../../data-source";
import { IUserRequest } from "../../interfaces/users";
import { hash } from "bcrypt";
import { User } from "../../entities/user.entity";
import { appError } from "../../errors/appError";

const createUserService = async ({
  name,
  email,
  cpf,
  password,
  isAdm,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const findCpf = await userRepository.findOneBy({ cpf });
  if (findCpf) {
    throw new appError(400, "This CPF is already in use");
  }

  if (!password) {
    throw new Error("Password is missing");
  }
  password = await hash(password, 10);
  const newUser = userRepository.create({
    name,
    email,
    cpf,
    isAdm,
    password,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await userRepository.save(newUser);
  return newUser;
};

export default createUserService;
