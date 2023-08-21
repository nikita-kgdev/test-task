"use serve"
import { AdminUserSchema } from "@src/backend/models/user";
import { passwordHashCreate } from "@src/backend/utils/passwordHash";
import Joi from "joi";
import { mongoConnect } from "@src/backend/lib/mongoConnect";
import { getJwt } from "@src/backend/utils/jwt";
import { mapWithCommonId } from "@src/backend/utils/mapWithCommonId";
import { NextRequest, NextResponse } from 'next/server';

const schema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().required(),
});
export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json()
  try {
    await mongoConnect();
    const value = await schema.validateAsync(body);
    const { passwordHash, passwordSalt } = passwordHashCreate(
        body.password,
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
    return NextResponse.json({ user, session });
  } catch (error) {

    return new Response(
        JSON.stringify({
          // @ts-ignore
          detatils: error?.details,
        }),
        {
          status: 403,
        },
    );
  }
}