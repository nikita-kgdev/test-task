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
    required: false,
  },
  ip: {
    type: String,
    required: false,
  },
  userAgent: {
    type: String,
    required: false,
  },
  screenSize: {
    type: String,
    required: false,
  },
  index: {
    type: Number,
    required: false,
  },
});

export const ClickSchema =
  (models.Click as Model<ClickMongoEntity>) || model("Click", Click);
