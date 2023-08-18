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
  label: BannerLabel;
}
export interface BannerEntity {
  id: string;
  title: string;
  content: string;
  color: string;
  label: BannerLabel;
}
export interface BannerMongoEntity extends MongoEntity{
  title: string;
  content: string;
  color: string;
  label: BannerLabel;
}
