import { Doctor } from "../../entities/doctor.entity";
import { User } from "../../entities/user.entity";

export interface IExams {
  user_id: string;
  doctor_id: string;
  tipo_exame: string;
  data: string;
  hora: string;
  resultado: string;
}

export interface IExamUpdate {
  user_id: string;
  doctor_id?: string;
  tipo_exame: string;
  data: string;
  hora: string;
  resultado: string;
}
