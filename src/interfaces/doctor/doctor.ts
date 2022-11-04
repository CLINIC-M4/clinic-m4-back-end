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

export interface IDoctorUpdate {
  name?: string
  email?: string
  password?: string
  isActive?:boolean
  isAdm?:boolean
  id?: string
}

export interface IDoctorRegister {
  name: string;
  email: string;
  crm: string;
  password: string;
}
