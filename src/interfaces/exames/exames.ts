import { Doctor } from "../../entities/doctor.entity";

export interface IExams {
  user_id: string;
  doctor_id: Doctor;
  tipo_exame: string;
  data: string;
  hora: string;
  resultado: string;
}

export interface IExamUpdate {
  user_id: string;
  doctor_id?: Doctor;
  tipo_exame: string;
  data: string;
  hora: string;
  resultado: string;
}

export interface IExamsTest {
  user_id: {
    name: string;
    cpf: string;
  };
  doctor_id: {
    name: string;
    crm: string;
  };
  tipo_exame: string;
  data: string;
  hora: string;
  resultado: string;
}
