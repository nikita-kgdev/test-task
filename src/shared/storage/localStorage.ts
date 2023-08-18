import { isBrowserEnv } from '@src/utils/isBrowserEnv';

const KEY = "KEY:";

const getKey = (key: string) => `${KEY}${key}`;

export const getItem = (key: string) => {
  if (!isBrowserEnv()) {
    return null;
  }
  return localStorage?.getItem(getKey(key));
};
export const setItem = (key: string, item: string) => {
  if (!isBrowserEnv()) {
    return;
  }
  localStorage?.setItem(getKey(key), item);
}
export const removeItem = (key: string) => {
  if (!isBrowserEnv()) {
    return;
  }
  localStorage?.removeItem(getKey(key));
}
