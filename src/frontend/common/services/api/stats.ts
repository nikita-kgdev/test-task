import { apiInstance } from "@src/frontend/common/services/api/instance";
import { BannerEntity } from "@src/shared/interfaces/banner";
import { ClickEntity } from "@src/shared/interfaces/click";

export const createClick = async (
  banner: BannerEntity & { screenSize: string; index: number },
) => {
  return (await apiInstance.post("/stats/click", banner)).data;
};
export const getClicks = async () => {
  return (
    await apiInstance.get<{
      clicksData: { banner: BannerEntity; clicks: ClickEntity[] }[];
    }>("/stats/click")
  ).data;
};
