"use serve";
import { BannerLabel } from "@src/shared/interfaces/banner";

export const getBannerFromFormData = async (formData: FormData) => {
  return {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    color: formData.get("color") as string,
    label: formData.get("label") as BannerLabel,
    imageFirst: formData.get("imageFirst") === 'true',
    imageBlob: formData.get("imageUrl") as Blob | null,
  };
};
