export const VerificationEmail = (email: string, token: string, fullName: string) => {
    return `
    Scuparadise Account Verification
  
    Hello ${fullName},
    
    Welcome to Scuparadise! Please verify your email address by clicking the link below:
    
    https://your-domain.com/auth/verify-email?token=${token}&email=${email}
    
    If you did not sign up for an account on Scuparadise, please disregard this email.
    
    Thanks,
    The Scuparadise Team
    `;
  }