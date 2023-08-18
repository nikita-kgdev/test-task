import type { NextApiRequest, NextApiResponse } from "next";
import { mongoConnect } from "@src/lib/mongoConnect";
import { getUserFromRequest } from "@src/utils/getUserFromRequest";
import Joi from "joi";
import { BannerLabel } from "@src/shared/interfaces/banner";
import { mapWithCommonId } from "@src/utils/mapWithCommonId";
import { ClickSchema } from "@src/models/click";

const schema = Joi.object({
  screenSize: Joi.string().required(),
  index: Joi.number().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  color: Joi.string()
    .regex(/^#[A-Fa-f0-9]{6}$/)
    .required(),
  label: Joi.string()
    .valid(...Object.values(BannerLabel))
    .required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const userFromRequest = getUserFromRequest(req);
    if (!userFromRequest) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }
    const clicks = await ClickSchema.find().lean();
    res.status(200).send({ clicks: clicks.map(mapWithCommonId) });
  } else if (req.method === "POST") {
    try {
      const userFromRequest = getUserFromRequest(req);
      const value = await schema.validateAsync(req.body);
      await mongoConnect();
      await ClickSchema.create({
        ...value,
        adminClick: !userFromRequest,
        id: req.socket.remoteAddress,
        userAgent: req.headers["user-agent"],
      });
      res.status(201).json({ message: "ClickCounted" });
    } catch (error) {
      res.status(403).json({
        detatils: error?.details,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
