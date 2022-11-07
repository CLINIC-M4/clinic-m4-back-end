import * as yup from "yup";

const createScheduleSerializer = yup.object().shape({
  doctorId: yup.string().required(),
  date: yup.string().required(),
  hour: yup.string().required(),
});

const updateScheduleSerializer = yup.object().shape({
  doctorId: yup.string().required(),
  date: yup.string().required(),
  hour: yup.string().required(),
});

export { createScheduleSerializer, updateScheduleSerializer };
