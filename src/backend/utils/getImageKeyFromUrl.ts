"use serve"
export const getImageKeyFromUrl = (url:string) => {
  return url.split('/').at(-1);
}