import { FRONTEND_ROUTES } from "../config/FrontendConfig";

export const VerificationEmail = (
  email: string,
  token: string,
  fullName: string
) => {
  const encodedEmail = encodeURIComponent(email);
  const encodedToken = encodeURIComponent(token);

  return `Scuparadise Account Verification

Hello ${fullName},

Welcome to Scuparadise! Please verify your email address by clicking the link below:

${FRONTEND_ROUTES.verifyEmail}?token=${encodedToken}&email=${encodedEmail}

If you did not sign up for an account on Scuparadise, please disregard this email.

Thanks,
The Scuparadise Team`;
};
