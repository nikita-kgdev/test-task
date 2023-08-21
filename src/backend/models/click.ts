"use serve"
import { Schema, model, models, Model } from "mongoose";
import { ClickMongoEntity } from "@src/shared/interfaces/click";
import { BannerLabel } from "@src/shared/interfaces/banner";

const Click = new Schema<ClickMongoEntity>({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
        enum: Object.values(BannerLabel),
    },
    adminClick: {
        type: Boolean,
        required: true,
    },
    ip: {
        type: String,
        required: true,
    },
    userAgent: {
        type: String,
        required: true,
    },
    screenSize: {
        type: String,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
    banner: { type: Schema.Types.ObjectId, required:true, ref: 'Story' },
});

export const ClickSchema =
    (models.Click as Model<ClickMongoEntity>) || model("Click", Click);
