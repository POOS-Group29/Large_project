import jwt from "jsonwebtoken";
import { AuthConfig } from "../config/AuthConfig";
import logger from "../config/winston";

export const authMiddleware = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401);
    return res.json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, AuthConfig.secret) as {
      user: {
        _id: string;
        name: string;
        email: string;
        verified: boolean;
      };
    };
    req.user = decoded.user;
    logger.info(`User ${req.user._id} authenticated`);

    if (!req.user.verified) {
      res.status(401);
      return res.json({ message: "Email not verified" });
    }

    next();
  } catch (error) {
    logger.error(`Error: ${error}`);
    res.status(401);
    res.json({ message: "Not authorized" });
  }
};
