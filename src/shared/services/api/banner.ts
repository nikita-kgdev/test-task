import { apiInstance } from "@src/shared/services/api/instance";
import { Banner, BannerEntity } from "@src/shared/interfaces/banner";

export const getBanners = async () =>
  (await apiInstance.get<{ banners: BannerEntity[] }>("/content/banners")).data;
export const createBanner = async (banner: Banner) =>
  (await apiInstance.post<{ banner: BannerEntity }>("/content/banners", banner))
    .data;
export const updateBanner = async ({
  id,
  banner,
}: {
  id: string;
  banner: Banner;
}) =>
  (
    await apiInstance.put<{ banner: BannerEntity }>(
      `/content/banners/${id}`,
      banner,
    )
  ).data;
export const deleteBanner = async (id: string) =>
  (await apiInstance.delete(`/content/banners/${id}`)).data;
