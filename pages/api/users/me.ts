import type { NextApiRequest, NextApiResponse } from "next";
import { AdminUserSchema } from "@src/models/user";
import { mongoConnect } from "@src/lib/mongoConnect";
import { getUserFromRequest } from "@src/utils/getUserFromRequest";
import { mapWithCommonId } from "@src/utils/mapWithCommonId";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const user = getUserFromRequest(req);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      res.status(200).json({
        user
      });
    } catch (error) {
      res.status(403).json({
        detatils: error?.details,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
