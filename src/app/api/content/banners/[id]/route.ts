"use serve";
import { mongoConnect } from "@src/backend/lib/mongoConnect";
import { BannerSchema } from "@src/backend/models/banner";
import { getUserFromRequest } from "@src/backend/utils/getUserFromRequest";
import Joi from "joi";
import { BannerLabel } from "@src/shared/interfaces/banner";
import { mapWithCommonId } from "@src/backend/utils/mapWithCommonId";
import { ClickSchema } from "@src/backend/models/click";
import { getBannerFromFormData } from "@src/backend/utils/getBannerFromFormData";
import { getImageKeyFromUrl } from "@src/backend/utils/getImageKeyFromUrl";
import { deleteFile, uploadFile } from "@src/backend/lib/utapi";
import { NextRequest, NextResponse } from "next/server";
import { Params } from "@src/shared/interfaces/params";

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

export const PUT = async (req: NextRequest, { params }: Params) => {
  try {
    const user = getUserFromRequest(req);
    if (!user) {
      return new Response(JSON.stringify({ Message: "Unauthorized" }), {
        status: 401,
      });
    }
    await mongoConnect();
    const id = params.id;
    const { imageBlob, ...bannerFromReq } = await getBannerFromFormData(
      await req.formData(),
    );
    const validBanner = await schema.validateAsync(bannerFromReq);
    if (imageBlob) {
      const banner = await BannerSchema.findById(id).lean();
      if (!banner) {
        return new Response(JSON.stringify({ Message: "Banner not found" }), {
          status: 404,
        });
      }
      const prevImageKey = getImageKeyFromUrl(banner.imageUrl);
      await deleteFile(prevImageKey as string);
      validBanner.imageUrl = await uploadFile(imageBlob);
    }
    await BannerSchema.updateOne({ _id: id }, validBanner);
    const updatedBanner = await BannerSchema.findById(id).lean();
    if (!updatedBanner) {
      return new Response(JSON.stringify({ Message: "Banner not found" }), {
        status: 404,
      });
    }
    return NextResponse.json({ banner: mapWithCommonId(updatedBanner) });
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

export const DELETE = async (req: NextRequest, { params }: Params) => {
  try {
    const user = getUserFromRequest(req);
    if (!user) {
      return new Response(JSON.stringify({ Message: "Unauthorized" }), {
        status: 401,
      });
    }
    await mongoConnect();
    const id = params.id;
    await ClickSchema.deleteMany({ banner: id });
    const banner = await BannerSchema.findById(id).lean();
    if (!banner) {
      return new Response(JSON.stringify({ message: "Banner not found" }), {
        status: 404,
      });
    }
    const prevImageKey = getImageKeyFromUrl(banner.imageUrl);
    await deleteFile(prevImageKey as string);
    await BannerSchema.deleteOne({ _id: id });
    return NextResponse.json({ banner: { message: "Deleted" } });
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
