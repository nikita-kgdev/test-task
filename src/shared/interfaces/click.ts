import { BannerMongoEntity } from '@src/shared/interfaces/banner';
import { MongoEntity } from '@src/shared/interfaces/mongoEntity';

export interface ClickMongoEntity extends BannerMongoEntity {
    index: number;
    screenSize: string;
    ip: string;
    userAgent: string;
    adminClick: boolean;
    banner: unknown;
}

export type ClickEntity = Omit<ClickMongoEntity, keyof MongoEntity> & { id: string }