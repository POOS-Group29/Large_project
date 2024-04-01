import express from "express";
import jwt from "jsonwebtoken";
import { AuthConfig } from "../config/AuthConfig";
import { nodemailerTransporter, sendFromEmail } from "../config/nodemailer";
import logger from "../config/winston";
import { authMiddleware } from "../middleware/AuthMiddleware";
import User from "../model/User";
import { ResetPassword } from "../templates/ResetPassword";

export const AuthRoutes = express.Router();

AuthRoutes.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  logger.info(`User ${email} is trying to sign in`);
  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    const { _id, name, email } = user;
    logger.info(`User ${email} signed in`);
    const token = jwt.sign({ _id }, AuthConfig.secret, {
      expiresIn: AuthConfig.jwtExpiration,
    });
    res.json({ token, user: { _id, name, email } });
    return;
  }

  logger.error(`User ${email} failed to sign in`);
  res.status(401);
  res.json({ message: "Invalid email or password" });
});

AuthRoutes.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  // Check if user already exists
  logger.info(`User ${email} is trying to sign up`);
  const user = await User.findOne({ email });

  // If user exists, throw an error
  if (user) {
    logger.error(`User ${email} already exists`);
    res.status(400);
    return res.json({ message: "User already exists" });
  }

  // Create a new user
  const newUser = new User({ name, email, password });
  try {
    logger.info(`User ${email} signed up. Saving user to database`);
    await newUser.save();
  } catch (error) {
    logger.error(`Error to save user ${email} to database: ${error}`);
    res.status(400);
    return res.json({ message: "Invalid user data" });
  }

  if (newUser) {
    const { _id, name, email } = newUser;
    const token = jwt.sign({ _id }, AuthConfig.secret, {
      expiresIn: AuthConfig.jwtExpiration,
    });
    logger.info(`User ${email} signed up`);

    nodemailerTransporter.sendMail(
      {
        from: "no-reply@cop4331.xhoantran.com",
        to: "xhoantran@gmail.com",
        subject: "Message",
        text: "I hope this message gets sent!",
      },
      (err, info) => {
        if (err) {
          logger.error(`Error to send email: ${err}`);
        }

        if (info) {
          logger.info(`Email sent: ${info.response}`);
        }
      }
    );

    return res.json({ token, user: { _id, name, email } });
  }

  logger.error(`Error to sign up user ${email}`);
  res.status(400);
  return res.json({ message: "Invalid user data" });
});

AuthRoutes.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  logger.info(`User ${email} is trying to reset password`);

  const user = await User.findOne({ email });

  if (user) {
    const token = jwt.sign({ _id: user._id }, AuthConfig.secret, {
      expiresIn: "1h",
    });

    nodemailerTransporter.sendMail(
      {
        from: sendFromEmail,
        to: email,
        subject: "Reset Password",
        text: ResetPassword(user.name, token),
      },
      (err, info) => {
        if (err) {
          logger.error(`Error to send email: ${err}`);
        }

        if (info) {
          logger.info(`Email sent: ${info.response}`);
        }
      }
    );
  }

  return res.json({
    message: "If the email exists, you will receive an email",
  });
});

AuthRoutes.get("/profile", authMiddleware, async (req, res) => {
  // @ts-expect-error User is defined in the authMiddleware
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({ _id: user._id, name: user.name, email: user.email });
  } else {
    res.status(404);
    res.json({ message: "User not found" });
  }
});
