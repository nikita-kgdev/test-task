import type { NextApiRequest, NextApiResponse } from "next";
import { AdminUserSchema } from "@src/models/user";
import { passwordHashValidate } from "@src/utils/passwordHash";
import { mongoConnect } from "@src/lib/mongoConnect";
import { getJwt } from "@src/utils/jwt";
import { mapWithCommonId } from "@src/utils/mapWithCommonId";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      if (!req.body.email || !req.body.password) {
         res.status(403).json({ message: "Invalid credentials" });
        return;
      }
      await mongoConnect();
      const foundUser = await AdminUserSchema.findOne({ email: req.body.email }).lean();
      if (!foundUser){
        res.status(403).json({ message: "Invalid credentials" });
        return;
      }
      const mappedUser = mapWithCommonId(foundUser);
      const isValid = passwordHashValidate(
        req.body.password,
        foundUser.passwordSalt,
        foundUser.passwordHash,
      );
      if (isValid) {
        const user = {
          id: mappedUser.id,
          email: mappedUser.email,
        };
        const session = {
          accessToken: getJwt(user),
        };
        res.status(201).json({ user, session });
      } else {
        res.status(403).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(403).json({
        detatils: error?.details,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
