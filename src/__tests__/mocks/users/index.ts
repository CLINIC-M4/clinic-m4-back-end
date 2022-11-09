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
