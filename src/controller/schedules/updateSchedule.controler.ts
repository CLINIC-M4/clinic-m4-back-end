import { Request, Response } from "express";
import { IScheduleRequest } from "../../interfaces/schedules";
import updateScheduleService from "../../services/schedules/updateSchedule.service";
import { sendEmail } from "../../utils/email/nodemailers.utils";

const updateScheduleController = async (req: Request, res: Response) => {
  const infoSchedule: IScheduleRequest = req.body;
  const scheduleId = req.params.id;
  const schedule = await updateScheduleService(infoSchedule, scheduleId);
  if (schedule) {
    const day = schedule.date.slice(0, 2);
    const month = schedule.date.slice(3, 5);
    const year = schedule.date.slice(6, 10);
    const hour = schedule.hour.slice(0, 2);
    const minute = schedule.hour.slice(3, 5);
    await sendEmail({
      to: schedule.user.email,
      name: schedule.user.name,
      subject: "Agendamento consulta",
      title: "Consulta médica",
      text: `Olá, ${schedule.user.name}.\n\nObrigado por reagendar a consulta pela Kenzie Cliníca.\n\nSua consulta está marcada para ${schedule.date} as ${schedule.hour}.\nPara marcar no calendário basta clicar no link em anexo!`,
      location: "Endereço da Clinica",
      dateOne: `${year}${month}${day}T${hour}${minute}00`,
      dateTwo: `${year}${month}${day}T${hour}${minute}10`,
    });
  }
  return res
    .status(200)
    .json({ schedule: schedule });
};

export { updateScheduleController };
