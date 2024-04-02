import logger from "./winston";

if (
  process.env.NODE_ENV === "production" &&
  process.env.JWT_SECRET === undefined
) {
  logger.error("JWT_SECRET is not defined");
  throw new Error("JWT_SECRET is not defined");
}

export const AuthConfig = {
  secret: process.env.JWT_SECRET || "secret",
  jwtExpiration: "30d",
};
