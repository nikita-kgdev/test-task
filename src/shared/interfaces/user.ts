import { MongoEntity } from '@src/shared/interfaces/mongoEntity';

export interface UserCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
}

export interface UserMongoEntity extends MongoEntity{
  email: string;
  passwordHash: string;
  passwordSalt: string;
}
