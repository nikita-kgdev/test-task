import { NextApiRequest } from "next";
import { validateJwt } from "@src/utils/jwt";
import { User } from "@src/shared/interfaces/user";

export const getUserFromRequest = (req: NextApiRequest) => {
  if (typeof req.headers.authorization !== 'string'){
    return null;
  }
  const [bearer, token] = req.headers.authorization?.split(" ");
  if (!token || bearer !== "Bearer") {
    return null;
  }
  const user = validateJwt(token as string);
  return user as User;
};
