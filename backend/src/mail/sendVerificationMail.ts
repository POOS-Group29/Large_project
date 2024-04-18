import jwt from "jsonwebtoken";
import { AuthConfig } from "../config/AuthConfig";
import { awsTransporter, mailgunTransporter } from "../config/nodemailer";
import logger from "../config/winston";
import { VerificationEmail } from "../templates/Verification";

interface VerificationEmailProps {
  _id: string;
  email: string;
  name: string;
}

export const sendVerificationMail = async (props: VerificationEmailProps) => {
  const { email, _id, name } = props;

  const token = jwt.sign({ verifyUserId: _id }, AuthConfig.secret, {
    expiresIn: AuthConfig.jwtExpiration,
  });

  // Send verification email
  const mailOptions = {
    from: "no-reply@cop4331.xhoantran.com",
    to: email,
    subject: "Account Verification",
    text: VerificationEmail(email, token, name),
  };

  if (email === "xhoantran@gmail.com") {
    awsTransporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        logger.error(`Error sending verification email to ${email}: ${err}`);
      } else {
        logger.info(`Verification email sent to ${email}: ${info.response}`);
      }
    });
  } else {
    mailgunTransporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        logger.error(`Error sending verification email to ${email}: ${err}`);
      } else {
        logger.info(`Verification email sent to ${email}: ${info.response}`);
      }
    });
  }
};
