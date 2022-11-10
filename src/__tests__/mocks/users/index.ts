import { IDoctorRegister } from "../../../interfaces/doctor/doctor";
import { IUserLogin, IUserRequest } from "../../../interfaces/users";

export const mockedUser: IUserRequest = {
  name: "André Leandro",
  email: "leandrochillreff1@gmail.com",
  cpf: "12312312312",
  password: "123456",
  isAdm: false,
};

export const mockedUserNotName: IUserRequest = {
  name: "",
  email: "leandrochillreff1@gmail.com",
  cpf: "12312312312",
  password: "123456",
  isAdm: false,
};

export const mockedUserNotPassword: IUserRequest = {
  name: "André Leandro",
  email: "leandrochillreff1@gmail.com",
  cpf: "12312312312",
  password: "",
  isAdm: false,
};

export const mockedUserCPFInvalid: IUserRequest = {
  name: "André Leandro",
  email: "leandrochillreff1@gmail.com",
  cpf: "1232312312",
  password: "123456",
  isAdm: false,
};

export const mockedUserLogin: IUserLogin = {
  email: "leandrochillreff1@gmail.com",
  password: "123456",
};

export const mockedAdmin: IUserRequest = {
  name: "Admin",
  email: "leandroschillreff@gmail.com",
  cpf: "52312312512",
  password: "123456",
  isAdm: true,
};

export const mockedAdminLogin: IUserLogin = {
  email: "leandroschillreff@gmail.com",
  password: "123456",
};

export const mockedDoctor: IDoctorRegister = {
  name: "Dr. Enrico Freitas",
  email: "enricofreitas1@gmail.com",
  crm: "12321953-4/br",
  password: "enrico123"
}

export const mockedDoctorNotName: IDoctorRegister = {
  name: "",
  email: "enricofreitas1@gmail.com",
  crm: "12321953-4/br",
  password: "enrico123",
};

export const mockedDoctorNotPassword: IDoctorRegister = {
  name: "Dr. Enrico Freitasd",
  email: "enricofreitas1@gmail.com",
  crm: "12321953-4/br",
  password: "",
};

export const mockedDoctorLogin: IUserLogin = {
  email: "enricofreitas1@gmail.com",
  password: "enrico123",
};