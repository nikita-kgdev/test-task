import { BannerMongoEntity } from '@src/shared/interfaces/banner';

export interface ClickMongoEntity extends BannerMongoEntity{
    index: number;
    screenSize: string;
    ip:string;
    userAgent:string;
    adminClick:boolean;
}