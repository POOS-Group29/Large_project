import jwt from "jsonwebtoken";
import { AuthConfig } from "../config/AuthConfig";
import User from "../model/User";

export const authMiddleware = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(401);
    res.json({ message: "Not authorized" });
  }

  try {
    // Verify token with the secret key and jwtExpiration
    const decoded = jwt.verify(token, AuthConfig.secret) as { _id: string };

    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    res.status(401);
    res.json({ message: "Not authorized" });
  }
};
