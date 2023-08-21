"use serve"
import { AdminUserSchema } from "@src/backend/models/user";
import { passwordHashValidate } from "@src/backend/utils/passwordHash";
import { mongoConnect } from "@src/backend/lib/mongoConnect";
import { getJwt } from "@src/backend/utils/jwt";
import { mapWithCommonId } from "@src/backend/utils/mapWithCommonId";
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json()
  try {
    if (!body.email || !body.password) {
      return new Response(
          JSON.stringify({ message: "Invalid credentials" }),
          {
            status: 403,
          },
      );
    }
    await mongoConnect();
    const foundUser = await AdminUserSchema.findOne({ email: body.email }).lean();
    if (!foundUser){
      return new Response(
          JSON.stringify({ message: "Invalid credentials" }),
          {
            status: 403,
          },
      );
    }
    const mappedUser = mapWithCommonId(foundUser);
    const isValid = passwordHashValidate(
        body.password,
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
      return NextResponse.json({ user, session });
    } else {
      return new Response(
          JSON.stringify({ message: "Invalid credentials" }),
          {
            status: 403,
          },
      );
    }
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
