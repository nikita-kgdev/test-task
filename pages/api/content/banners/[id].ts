import type { NextApiRequest, NextApiResponse } from "next";
import { mongoConnect } from "@src/lib/mongoConnect";
import { BannerSchema } from "@src/models/banner";
import { getUserFromRequest } from "@src/utils/getUserFromRequest";
import Joi from "joi";
import { BannerLabel } from "@src/shared/interfaces/banner";
import { mapWithCommonId } from "@src/utils/mapWithCommonId";

const schema = Joi.object({
  title: Joi.string().optional(),
  content: Joi.string().optional(),
  color: Joi.string()
    .regex(/^#[A-Fa-f0-9]{6}$/)
    .optional(),
  label: Joi.string()
    .valid(...Object.values(BannerLabel))
    .optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "PUT") {
    try {
      const user = getUserFromRequest(req);
      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      await mongoConnect();
      const id = req.query.id;
      const banner = await schema.validateAsync(req.body);
      await BannerSchema.updateOne({ _id: id }, banner);
      const updatedBanner = await BannerSchema.findById(id).lean();
      if (!updatedBanner) {
        res.status(404).json({ message: "Not found" });
        return
      }
      res.status(201).json({ banner: mapWithCommonId(updatedBanner) });
    } catch (error) {
      res.status(403).json({
        detatils: error?.details,
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const user = getUserFromRequest(req);
      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      await mongoConnect();
      const id = req.query.id;
      await BannerSchema.deleteOne({ _id: id });
      res.status(201).json({ message: "Deleted" });
    } catch (error) {
      res.status(403).json({
        detatils: error?.details,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
