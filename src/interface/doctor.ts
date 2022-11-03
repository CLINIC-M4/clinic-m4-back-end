export interface IDoctor {
  id: string;
  name: string;
  email: string;
  crm: string;
  telephone: number;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDoctorRegister {
  name: string;
  email: string;
  crm: string;
  telephone: number;
  password: string;
}
