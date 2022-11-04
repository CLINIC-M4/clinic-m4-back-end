import "dotenv/config";
import AppDataSource from "../../data-source";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Doctor } from "../../entities/doctor.entitie";
import { IDoctorLogin } from "../../interfaces/doctor/doctor";

const doctorLoginService = async ({ email, password }: IDoctorLogin) => {
  const userRepository = AppDataSource.getRepository(Doctor);
  const doctorAccount = await userRepository.findOneBy({ email });

  if (!doctorAccount) {
    throw new Error("Wrong email/password");
  }
  if (!bycrypt.compareSync(password, doctorAccount.password!)) {
    throw new Error("Wrong email/password");
  }

  const token = jwt.sign(
    {
      email: email,
      isAdm: doctorAccount.isAdm,
      isActive: doctorAccount.isActive,
      id: doctorAccount.id,
    },
    process.env.SECRET_KEY as string,
    { expiresIn: "1d" }
  );

  return token;
};

export default doctorLoginService;
