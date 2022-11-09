import * as yup from "yup";

const createExameSerializer = yup.object().shape({
  user_id: yup.string().required(),
  data: yup.string().required(),
  hora: yup.string().required(),
  tipo_exame: yup.string().required(),
  resultado: yup.string().required(),
});

const updateExameSerializer = yup.object().shape({
  data: yup.string().required(),
  hora: yup.string().required(),
  tipo_exame: yup.string().required(),
  resultado: yup.string().required(),
});

export { createExameSerializer, updateExameSerializer };
