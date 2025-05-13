import nodemailer from "nodemailer";
import { registrationEmailTemplate } from "../email.template";
import dotenv from "dotenv";
import { DotEnvError } from "../../errors/dotenv";

dotenv.config();
const SERVER_URI = process.env.SERVER_URI;
if (!SERVER_URI) throw new DotEnvError();

const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER;
if (!EMAIL_PROVIDER) throw new DotEnvError();
const EMAIL_SENDER = process.env.EMAIL_SENDER;
if (!EMAIL_SENDER) throw new DotEnvError();
const EMAIL_SENDER_PASSWORD = process.env.EMAIL_SENDER_PASSWORD;
if (!EMAIL_SENDER_PASSWORD) throw new DotEnvError();

// Aruba settings
const isGmail = EMAIL_PROVIDER!.toLowerCase() === "gmail";
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_SECURE = process.env.EMAIL_SECURE === "true";
if (isGmail) {
  if (!EMAIL_HOST) throw new DotEnvError();
  if (!EMAIL_PORT) throw new DotEnvError();
  if (EMAIL_SECURE === undefined) throw new DotEnvError();
}

export class EmailService {
  private transporter;

  constructor() {
    const isGmail = EMAIL_PROVIDER!.toLowerCase() === "gmail";

    const transportOptions = isGmail
      ? {
          service: "gmail",
          auth: {
            user: EMAIL_SENDER,
            pass: EMAIL_SENDER_PASSWORD,
          },
        }
      : {
          host: EMAIL_HOST,
          port: Number(EMAIL_PORT),
          secure: EMAIL_SECURE,
          auth: {
            user: EMAIL_SENDER,
            pass: EMAIL_SENDER_PASSWORD,
          },
        };

    this.transporter = nodemailer.createTransport(transportOptions);
  }

  async sendEmail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: EMAIL_SENDER,
      to,
      subject,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendConfirmationEmail(
    username: string,
    userId: string,
    confirmationCode: string
  ) {
    const confirmationLink = `${SERVER_URI}/api/confirm-email?userId=${userId}&code=${confirmationCode}`;
    const mailOptions = {
      from: EMAIL_SENDER,
      to: username,
      subject: "Conferma la tua email",
      html: registrationEmailTemplate(confirmationLink),
    };
    console.log(username, userId, confirmationCode);
    await this.transporter.sendMail(mailOptions);
  }
}

export const emailService = new EmailService();
