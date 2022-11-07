import * as yup from "yup";

const createUserSerializer = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  cpf: yup.string().required().min(11).max(11),
  password: yup.string().required(),
});

const sessionUserSerializer = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export { createUserSerializer, sessionUserSerializer };
