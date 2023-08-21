"use serve"
import jwt from "jsonwebtoken";

const SECRET = "SECRET";

export const getJwt = (user: Record<string, any>) => {
  return jwt.sign(user, SECRET, { expiresIn: "1w" });
};
export const validateJwt = (token: string) => {
  return jwt.verify(token, SECRET);
};
