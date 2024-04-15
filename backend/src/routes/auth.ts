import express from "express";
import jwt from "jsonwebtoken";
import { AuthConfig } from "../config/AuthConfig";
import { nodemailerTransporter, sendFromEmail } from "../config/nodemailer";
import logger from "../config/winston";
import { authMiddleware } from "../middleware/AuthMiddleware";
import User from "../model/User";
import { VerificationEmail } from "../templates/Verification";
import { ResetPassword } from "../templates";

export const AuthRoutes = express.Router();

AuthRoutes.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  logger.info(`User ${email} is trying to sign in`);
  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    const { _id, name, email } = user;
    logger.info(`User ${email} signed in`);
    const token = jwt.sign(
      {
        user: {
          _id,
          name,
          email,
        },
      },
      AuthConfig.secret,
      {
        expiresIn: AuthConfig.jwtExpiration,
      }
    );
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
    const token = jwt.sign({ verifyUserId: _id }, AuthConfig.secret, {
      expiresIn: AuthConfig.jwtExpiration,
    });
    logger.info(`User ${email} signed up`);

    // Send verification email
    const mailOptions = {
      from: "no-reply@cop4331.xhoantran.com",
      to: email,
      subject: "Account Verification",
      text: VerificationEmail(email, token, name),
    };

    nodemailerTransporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        logger.error(`Error sending verification email to ${email}: ${err}`);
      } else {
        logger.info(`Verification email sent to ${email}: ${info.response}`);
      }
    });

    return res.json({ token, user: { _id, name, email } });
  }

  logger.error(`Error to sign up user ${email}`);
  res.status(400);
  return res.json({ message: "Invalid user data" });
});

AuthRoutes.post("/verify-email", async (req, res) => {
  const { token, email } = req.body;

  try {
    const decoded = jwt.verify(token as string, AuthConfig.secret) as {
      verifyUserId?: string;
    };

    if (decoded.verifyUserId) {
      const user = await User.findById(decoded.verifyUserId);
      logger.info(`User ${email} is trying to verify email`);

      if (user && user.email === email) {
        user.verified = true;
        await user.save();
        return res.json({ message: "Email verified" });
      }
    }
  } catch (error) {
    logger.error(`Error to verify email: ${error}`);
    return res.json({ message: "Invalid token" });
  }

  return res.json({ message: "Invalid token" });
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

AuthRoutes.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  logger.info(`User ${email} is trying to reset password`);

  const user = await User.findOne({ email });

  if (user) {
    const token = jwt.sign({ resetUserId: user._id }, AuthConfig.secret, {
      expiresIn: 600,
    });

    nodemailerTransporter.sendMail(
      {
        from: sendFromEmail,
        to: email,
        subject: "Reset Password",
        text: ResetPassword(user.name, token),
      },
      (err, _) => {
        if (err) {
          logger.error(`Error to send email: ${err}`);
        }
      }
    );
  }

  return res.json({
    message: "If the email exists, you will receive an email",
  });
});

AuthRoutes.post("/reset-password", async (req, res) => {
  const { token, currentPassword, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, AuthConfig.secret) as {
      resetUserId?: string;
      _id?: string;
    };

    // Reset password from email not requiring current password
    if (decoded.resetUserId) {
      const user = await User.findById(decoded.resetUserId);
      if (user) {
        user.password = newPassword;
        await user.save();
        return res.json({ message: "Password reset successfully" });
      }
    } else if (decoded._id) {
      // Reset password from profile requiring current password
      const user = await User.findById(decoded._id);
      if (user && (await user.matchPasswords(currentPassword))) {
        user.password = newPassword;
        await user.save();
        return res.json({ message: "Password reset successfully" });
      }
    }
  } catch (error) {
    return res.json({ message: "Invalid token" });
  }
});
