import { createTransport } from "nodemailer";
import { IEmailRequest } from "../../interfaces/email";
import "dotenv/config";

const sendEmail = async ({
  subject,
  to,
  name,
  title,
  location,
  dateOne,
  dateTwo,
  text,
}: IEmailRequest): Promise<void> => {
  const transporter = createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: "brunoacev@live.com",
      pass: "Mix010203",
    },
  });

  await transporter
    .sendMail({
      from: "brunoacev@live.com",
      to: to,
      text: text,
      subject: subject,
      icalEvent: {
        filename: "invitation.ics",
        method: "request",
        content:
          "BEGIN:VCALENDAR\n" +
          "VERSION:2.0\n" +
          "CALSCALE:GREGORIAN\n" +
          "BEGIN:VTIMEZONE\n" +
          "TZID:America/Sao_Paulo\n" +
          "TZURL:http://tzurl.org/zoneinfo-outlook/America/Sao_Paulo\n" +
          "X-LIC-LOCATION:America/Sao_Paulo\n" +
          "BEGIN:STANDARD\n" +
          "TZNAME:-03\n" +
          "TZOFFSETFROM:-0300\n" +
          "TZOFFSETTO:-0300\n" +
          "DTSTART:19700101T000000\n" +
          "END:STANDARD\n" +
          "END:VTIMEZONE\n" +
          "BEGIN:VEVENT\n" +
          `DTSTART;TZID=America/Sao_Paulo:${dateOne}\n` +
          `DTEND;TZID=America/Sao_Paulo:${dateTwo}\n` +
          `SUMMARY:${title}\n` +
          `LOCATION:${location}\n` +
          "END:VEVENT\n" +
          "END:VCALENDAR",
      },
    })
    .then(() => {})
    .catch((err) => {
      console.log(err);
      throw new Error("Error sending email, try again later");
    });
};

export { sendEmail };
