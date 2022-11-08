import * as yup from "yup";

const createDoctorSerializer = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  crm: yup.string().required(),
  password: yup.string().required(),
});

export { createDoctorSerializer };
