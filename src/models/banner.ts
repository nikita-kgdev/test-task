import { Schema, model, models, Model } from "mongoose";
import { BannerLabel, BannerMongoEntity } from '@src/shared/interfaces/banner';

const Banner = new Schema<BannerMongoEntity>({
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
});

export const BannerSchema = models.Banner as Model<BannerMongoEntity> ||model("Banner", Banner);
