import { Schema, models, model, Model } from "mongoose";
import { UserMongoEntity } from "@src/shared/interfaces/user";

const AdminUser = new Schema<UserMongoEntity>({
  email: {
    type: String,
    index: { unique: true },
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  passwordSalt: {
    type: String,
    required: true,
  },
});

export const AdminUserSchema =
  (models.AdminUser as Model<UserMongoEntity>) || model("AdminUser", AdminUser);
