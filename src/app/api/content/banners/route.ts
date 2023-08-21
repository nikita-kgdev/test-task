"use serve";
import { mongoConnect } from "@src/backend/lib/mongoConnect";
import { BannerSchema } from "@src/backend/models/banner";
import { getUserFromRequest } from "@src/backend/utils/getUserFromRequest";
import Joi from "joi";
import { BannerLabel } from "@src/shared/interfaces/banner";
import { mapWithCommonId } from "@src/backend/utils/mapWithCommonId";
import { uploadFile } from "@src/backend/lib/utapi";
import { getBannerFromFormData } from "@src/backend/utils/getBannerFromFormData";
import { NextRequest, NextResponse } from "next/server";

const bannerScheme = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  imageFirst: Joi.boolean().required(),
  color: Joi.string()
    .regex(/^#[A-Fa-f0-9]{6}$/)
    .required(),
  label: Joi.string()
    .valid(...Object.values(BannerLabel))
    .required(),
});

export const GET = async () => {
  try {
    await mongoConnect();
    const banners = await BannerSchema.find({}).lean();
    return NextResponse.json({
      banners: banners.map(mapWithCommonId).reverse(),
    });
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
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const user = getUserFromRequest(req);
    if (!user) {
      return new Response(JSON.stringify({ Message: "Unauthorized" }), {
        status: 401,
      });
    }
    await mongoConnect();
    const banners = await BannerSchema.find({});
    if (banners.length >= 3) {
      return new Response(
        JSON.stringify({ message: "Max amount of banner was reached" }),
        {
          status: 403,
        },
      );
    }
    const { imageBlob, ...banner } = await getBannerFromFormData(await req.formData());
    if (!imageBlob) {
      return new Response(JSON.stringify({ message: "No image provided" }), {
        status: 403,
      });
    }
    const validBanner = await bannerScheme.validateAsync(banner);
    const imageUrl = await uploadFile(imageBlob);
    const createdBanner = (
      await BannerSchema.create({ ...validBanner, imageUrl })
    ).toObject();
    return new Response(
      JSON.stringify({ banner: mapWithCommonId(createdBanner) }),
      { status: 201 },
    );
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
};
