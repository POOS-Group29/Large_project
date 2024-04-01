import logger from "./winston";

if (!process.env.FRONTEND_BASE_URL) {
  logger.error("FRONTEND_BASE_URL is not set");
  process.exit(1);
}

export const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;
export const FRONTEND_ROUTES = {
  resetPassword: `${FRONTEND_BASE_URL}/auth/reset-password`,
};
