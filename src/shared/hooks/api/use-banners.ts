import { useQuery } from '@tanstack/react-query';
import { getBanners } from '@src/shared/services/api/banner';

export const BANNERS_KEY = 'banners'

export const useBanners = () => {
  return useQuery([BANNERS_KEY], getBanners);
}