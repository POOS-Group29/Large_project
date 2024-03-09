if (
  process.env.NODE_ENV === "production" &&
  process.env.JWT_SECRET === undefined
) {
  console.error("JWT_SECRET is not set");
  process.exit(1);
}

export const AuthConfig = {
  secret: process.env.JWT_SECRET || "secret",
  jwtExpiration: "30d",
};
