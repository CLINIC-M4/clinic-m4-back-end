export interface IDoctor {
  id: string;
  name: string;
  email: string;
  crm: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IDoctorLogin{
  email: string
  password: string
}

export interface IDoctorRegister {
  name: string;
  email: string;
  crm: string;
  password: string;
}
