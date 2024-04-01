import logger from "./winston";

if (!process.env.FRONTEND_BASE_URL) {
  logger.error("FRONTEND_BASE_URL is not set");
  throw new Error("FRONTEND_BASE_URL is not set");
}

export const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;
export const FRONTEND_ROUTES = {
  resetPassword: `${FRONTEND_BASE_URL}/auth/reset-password`,
};
