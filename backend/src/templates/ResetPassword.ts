import { FRONTEND_ROUTES } from "../config/FrontendConfig";

export const ResetPassword = (name: string, token: string) => {
  return `Scuparadise Password Reset

Hello ${name},

We received a request to reset your password for the Scuparadise app. If you initiated this request, please follow the link below to proceed:

${FRONTEND_ROUTES.resetPassword}?token=${token}

If you did not request this password reset, please ignore this email. Your password will remain unchanged.

Thanks,
The Scuparadise Team`;
};
