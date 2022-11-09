export interface IScheduleRequest {
  doctorId: string;
  date: string;
  hour: string;
}

export interface IScheduleResponse {
  id: string;
  date: string;
  hour: string;
  user: {
    name: string;
    email: string;
    cpf: string;
  };
  doctor: {
    name: string;
    email: string;
    crm: string;
  };
}
