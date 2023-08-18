import { apiInstance } from "@src/shared/services/api/instance";
import { UserCredentials, User } from '@src/shared/interfaces/user';
import { Session } from '@src/shared/interfaces/session';

export const signUp = async (user: UserCredentials) =>
  (
    await apiInstance.post<{
      user: User;
      session: Session;
    }>("/users/sign-up", user)
  ).data;

export const signIn = async (user: UserCredentials) =>
  (
    await apiInstance.post<{
      user: User;
      session: Session;
    }>("/users/sign-in", user)
  ).data;

export const getMe = async () =>
  (
    await apiInstance.get<{
        user: User;
    }>("/users/me")
  ).data;
