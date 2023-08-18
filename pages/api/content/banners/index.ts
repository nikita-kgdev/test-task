import type { NextApiRequest, NextApiResponse } from "next";
import { mongoConnect } from "@src/lib/mongoConnect";
import { BannerSchema } from "@src/models/banner";
import { getUserFromRequest } from '@src/utils/getUserFromRequest';
import Joi from 'joi';
import { BannerLabel } from '@src/shared/interfaces/banner';
import { mapWithCommonId } from '@src/utils/mapWithCommonId';

const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    color: Joi.string().regex(/^#[A-Fa-f0-9]{6}$/).required(),
    label: Joi.string().valid(...Object.values(BannerLabel)).required(),
});


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "GET") {
        try {
            await mongoConnect();
            const banners = await BannerSchema.find({}).lean();
            res.status(200).json({ banners:banners.map(mapWithCommonId).reverse() });
        } catch (error) {
            res.status(403).json({
                detatils: error?.details,
            });
        }
    } else if (req.method === "POST") {
        try {
            const user = getUserFromRequest(req);
            if (!user) {
                res.status(401).json({ message: 'Unauthorized' });
                return
            }
            await mongoConnect();
            const banners = await BannerSchema.find({});
            if (banners.length >= 3) {
                res.status(403).json({ message: 'Max amount of banner was reached' });
                return;
            }
            const banner = await schema.validateAsync(req.body);
            const createdBanner = (await BannerSchema.create(banner)).toObject()
            res.status(201).json({ banner:mapWithCommonId(createdBanner) });
        } catch (error) {
            res.status(403).json({
                detatils: error?.details,
            });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
