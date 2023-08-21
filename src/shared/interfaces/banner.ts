import { MongoEntity } from '@src/shared/interfaces/mongoEntity';

export enum BannerLabel {
  ORDER_NOW = "Order now",
  JOIN_NOW = "Join now",
  LISTEN_NOW = "Listen now",
}

export interface Banner {
  title: string;
  content: string;
  color: string;
  imageUrl: string;
  label: BannerLabel;
  imageFirst: boolean;
}
export interface NoImageBanner {
  title: string;
  content: string;
  color: string;
  label: BannerLabel;
  imageFirst: boolean;
}
export interface CreateBanner {
  title: string;
  content: string;
  color: string;
  label: BannerLabel;
  imageFirst: boolean;
  imageUrl: File;
}
export interface BannerEntity {
  id: string;
  title: string;
  content: string;
  color: string;
  imageUrl: string;
  imageFirst: boolean;
  label: BannerLabel;
}
export interface BannerMongoEntity extends MongoEntity{
  title: string;
  imageUrl: string;
  content: string;
  color: string;
  imageFirst: boolean;
  label: BannerLabel;
}
