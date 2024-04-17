import { z } from "zod";

export const UserSchema = z.object({
  _id: z.string(),
  email: z.string(),
  name: z.string(),
  isAdmin: z.boolean(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;

export const SignInRequestSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string(),
});

export type SignInRequestSchemaType = z.infer<typeof SignInRequestSchema>;

export const SignUpRequestSchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignUpRequestSchemaType = z.infer<typeof SignUpRequestSchema>;

export const AuthResponseSchema = z.object({
  user: UserSchema,
  token: z.string(),
});

export type AuthResponseSchemaType = z.infer<typeof AuthResponseSchema>;
