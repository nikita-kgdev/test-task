"use serve";
import { mongoConnect } from "@src/backend/lib/mongoConnect";
import { getUserFromRequest } from "@src/backend/utils/getUserFromRequest";
import Joi from "joi";
import { BannerLabel } from "@src/shared/interfaces/banner";
import { mapWithCommonId } from "@src/backend/utils/mapWithCommonId";
import { ClickSchema } from "@src/backend/models/click";
import { BannerSchema } from "@src/backend/models/banner";
import { NextRequest, NextResponse } from "next/server";

const schema = Joi.object({
    screenSize: Joi.string().required(),
    index: Joi.number().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    id: Joi.string().required(),
    imageUrl: Joi.string().uri().required(),
    color: Joi.string()
    .regex(/^#[A-Fa-f0-9]{6}$/)
    .required(),
    label: Joi.string()
    .valid(...Object.values(BannerLabel))
    .required(),
});

export const GET = async (req: NextRequest) => {
    const userFromRequest = getUserFromRequest(req);
    if (!userFromRequest) {
        return new Response(JSON.stringify({ Message: "Unauthorized" }), {
            status: 401,
        });
    }
    const banners = await BannerSchema.find({}).lean();
    const result = [];
    for (const banner of banners.map(mapWithCommonId)) {
        const clicks = await ClickSchema.find({ banner: banner.id }).lean();
        result.push({
            banner,
            clicks: clicks.map(mapWithCommonId),
        });
    }
    return NextResponse.json({ clicksData: result });
};

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    try {
        const userFromRequest = getUserFromRequest(req);
        const value = await schema.validateAsync(body);
        await mongoConnect();
        const banner = await BannerSchema.exists({ _id: value.id });
        if (!banner) {
            return new Response(JSON.stringify({ Message: "Forbidden" }), {
                status: 403,
            });
        }

        const { id: bannerId, ...rest } = value;
        await ClickSchema.create({
            ...rest,
            banner: bannerId,
            adminClick: !userFromRequest,
            // it can be undefined if not provided by hosting platform https://github.com/vercel/next.js/issues/47793
            ip: req.ip??req.headers.get('referer'),
            userAgent: req.headers.get("user-agent"),
        });
        return new Response(JSON.stringify({ message: "ClickCounted" }), {
            status: 201,
        });
    } catch (error) {
        console.log({error})
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
};
