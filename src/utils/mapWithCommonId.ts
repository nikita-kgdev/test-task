import { MongoEntity } from '@src/shared/interfaces/mongoEntity';

interface CommonEntity {
  id: string;
}

export const mapWithCommonId = <T extends MongoEntity>(
  entity: T,
): Omit<T, keyof MongoEntity> & CommonEntity => {
  const { _id, __v, ...clone } = entity;
  return { ...clone, id: _id };
};
