import { IExamsTest } from "../../../interfaces/exames/exames";

export const mockedExam: IExamsTest = {
  user_id: {
    name: "Paciente Teste",
    cpf: "0102030405",
  },
  doctor_id: {
    name: "Doutor Teste",
    crm: "010203",
  },
  tipo_exame: "Cardiovascular",
  data: "10/10/2022",
  hora: "13:20",
  resultado: "Possível ataque cardiaco",
};

export const mockedExamNotUser = {
  doctor_id: {
    name: "Doutor Teste",
    crm: "010203",
  },
  tipo_exame: "Cardiovascular",
  data: "10/10/2022",
  hora: "13:20",
  resultado: "Possível ataque cardiaco",
};
