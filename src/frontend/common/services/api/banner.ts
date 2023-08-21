import { apiInstance } from "@src/frontend/common/services/api/instance";
import { BannerEntity } from "@src/shared/interfaces/banner";

export const getBanners = async () => {
  return (await apiInstance.get<{ banners: BannerEntity[] }>("/content/banners")).data;
}
export const createBanner = async (banner: FormData) =>
  (await apiInstance.post<{ banner: BannerEntity }>("/content/banners", banner)).data;
export const updateBanner = async ({
  id,
  banner,
}: {
  id: string;
  banner: FormData;
}) =>
  (
    await apiInstance.put<{ banner: BannerEntity }>(`/content/banners/${id}`, banner)
  ).data;
export const deleteBanner = async (id: string) =>
  (await apiInstance.delete(`/content/banners/${id}`)).data;
