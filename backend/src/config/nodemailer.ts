import nodemailer from "nodemailer";
import nodemailerMailgun from "nodemailer-mailgun-transport";

if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
  throw new Error("Please provide a valid Mailgun API key and domain");
}

export const sendFromEmail = `no-reply@${process.env.MAILGUN_DOMAIN}`;

export const nodemailerTransporter = nodemailer.createTransport(
  nodemailerMailgun({
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  })
);
