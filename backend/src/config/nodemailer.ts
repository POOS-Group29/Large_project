import nodemailer from "nodemailer";
import nodemailerMailgun from "nodemailer-mailgun-transport";
let aws = require("@aws-sdk/client-ses");
let { defaultProvider } = require("@aws-sdk/credential-provider-node");

if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
  throw new Error("Please provide a valid Mailgun API key and domain");
}

export const sendFromEmail = `Scuparadise <no-reply@${process.env.MAILGUN_DOMAIN}>`;

export const mailgunTransporter = nodemailer.createTransport(
  nodemailerMailgun({
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  })
);

const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: "us-east-1",
  defaultProvider,
});

export const awsTransporter = nodemailer.createTransport({
  SES: { ses, aws },
});
