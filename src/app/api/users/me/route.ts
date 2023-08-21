"use serve";
import { getUserFromRequest } from "@src/backend/utils/getUserFromRequest";
import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest, res: NextResponse) => {
  res.status;
  try {
    const user = getUserFromRequest(req);
    if (!user) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
    return NextResponse.json({ user });
  } catch (error) {
    return new Response(
      JSON.stringify({
        // @ts-ignore
        details: error?.details,
      }),
      {
        status: 403,
      },
    );
  }
};
