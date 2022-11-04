import "dotenv/config";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserLogin } from "../../interfaces/users";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Doctor } from "../../entities/doctor.entitie";

const userLoginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);
  const account = await userRepository.findOneBy({ email });

  // const doctorRepository = AppDataSource.getRepository(Doctor)
  // const doctorAccount = await doctorRepository.findOneBy({ email })
  if (!account) {
    throw new Error("Wrong email/password");
  }
  // if(!doctorAccount){
  //   throw new Error("Wrong email/password");
  // }
  // if(!bycrypt.compareSync(password,doctorAccount.password!)){
  //   throw new Error("Wrong email/password");
  // }

  if (!bycrypt.compareSync(password, account.password!)) {
    throw new Error("Wrong email/password");
  }
  const token = jwt.sign(
    {
      isAdm: account.isAdm,
      id: account.id,
      isActive: account.isActive
    },
    process.env.SECRET_KEY as string,
    { expiresIn: "24h" }
  );

  return token;
};

export default userLoginService;
