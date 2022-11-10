import {
  IDoctorRegister,
  IDoctorLogin,
} from "../../../interfaces/doctor/doctor";

export const mockedDoctor: IDoctorRegister = {
  name: "Doctor",
  email: "doctor@gmail.com",
  crm: "12312312312",
  password: "123456",
};

export const mockedDoctorNotName: IDoctorRegister = {
  name: "",
  email: "doctor@gmail.com",
  crm: "12312312312",
  password: "123456",
};

export const mockedDoctorNotPassword: IDoctorRegister = {
  name: "Doctor",
  email: "doctor@gmail.com",
  crm: "12312312312",
  password: "",
};

export const mockedUserNotCrm: IDoctorRegister = {
  name: "Doctor",
  email: "doctor@gmail.com",
  crm: "",
  password: "123456",
};

export const mockedDoctorLogin: IDoctorLogin = {
  email: "doctor@gmail.com",
  password: "123456",
};
