import nodemailer from 'nodemailer';

import { SMTP } from '../constants/SMPT.js';
import { env } from '../utils/env.js';
import createHttpError from 'http-errors';

const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),

  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
});

export const sendEmail = async (options) => {
  try {
    return await transporter.sendMail(options);
  } catch (err) {
    console.log(err);
    throw createHttpError(500, 'Failed to send email, please try again later');
  }
};

// export const sendEmail = async (options) => {
//   try {
//     console.log('Sending email with options:', options); // Логування параметрів листа

//     const result = await transporter.sendMail(options);
//     console.log('Email sent successfully:', result); // Логування результату успішної відправки

//     return result;
//   } catch (error) {
//     console.error('Error while sending email:', error); // Логування помилки

//     throw createHttpError(500, 'Failed to send email, please try again later');
//   }
// };
