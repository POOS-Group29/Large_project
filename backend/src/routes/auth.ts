import express from "express";
import jwt from "jsonwebtoken";
import { AuthConfig } from "../config/AuthConfig";
import { authMiddleware } from "../middleware/AuthMiddleware";
import User from "../model/User";

export const AuthRoutes = express.Router();

AuthRoutes.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    const { _id, name, email } = user;
    const token = jwt.sign({ _id }, AuthConfig.secret, {
      expiresIn: AuthConfig.jwtExpiration,
    });
    res.json({ token, user: { _id, name, email } });
    return;
  }

  res.status(401);
  res.json({ message: "Invalid email or password" });
});

AuthRoutes.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  // Check if user already exists
  const user = await User.findOne({ email });

  // If user exists, throw an error
  if (user) {
    res.status(400);
    res.json({ message: "User already exists" });
  }

  // Create a new user
  const newUser = new User({ name, email, password });
  try {
    await newUser.save();
  } catch (error) {
    res.status(400);
    res.json({ message: "Invalid user data" });
    return;
  }

  if (newUser) {
    const { _id, name, email } = newUser;
    const token = jwt.sign({ _id }, AuthConfig.secret, {
      expiresIn: AuthConfig.jwtExpiration,
    });
    res.json({ token, user: { _id, name, email } });
    return;
  }

  res.status(400);
  res.json({ message: "Invalid user data" });
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
