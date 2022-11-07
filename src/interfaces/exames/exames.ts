import { Doctor } from "../../entities/doctor.entity";
import { User } from "../../entities/user.entity";

export interface IExames {
  user_id: String;
  doctor_id: Doctor;
  tipo_exame: String;
  data: Date;
  hora: String;
  resultado: String;
}
