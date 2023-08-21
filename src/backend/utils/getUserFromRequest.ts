"use serve"
import { validateJwt } from "@src/backend/utils/jwt";
import { User } from "@src/shared/interfaces/user";
import { NextRequest } from 'next/server';

export const getUserFromRequest = (req: NextRequest) => {
  const payload = req.headers.get('Authorization')
  if (!payload){
    return null;
  }
  const [bearer, token] = payload.split(" ");
  if (!token || bearer !== "Bearer") {
    return null;
  }
  const user = validateJwt(token as string);
  return user as User;
};
