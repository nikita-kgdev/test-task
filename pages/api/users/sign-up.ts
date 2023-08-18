import type { NextApiRequest, NextApiResponse } from "next";
import { AdminUserSchema } from "@src/models/user";
import { passwordHashCreate } from "@src/utils/passwordHash";
import Joi from "joi";
import { mongoConnect } from "@src/lib/mongoConnect";
import { getJwt } from "@src/utils/jwt";
import { mapWithCommonId } from "@src/utils/mapWithCommonId";

const schema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      await mongoConnect();
      const value = await schema.validateAsync(req.body);
      const { passwordHash, passwordSalt } = passwordHashCreate(
        req.body.password,
      );
      const createdUser = mapWithCommonId(
        (
          await AdminUserSchema.create({
            email: value.email,
            passwordHash,
            passwordSalt,
          })
        ).toObject(),
      );
      const user = {
        id: createdUser.id,
        email: createdUser.email,
      };
      const session = {
        accessToken: getJwt(user),
      };
      res.status(201).json({ user, session });
    } catch (error) {
      console.log({ error });
      res.status(403).json({
        detatils: error?.details,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
