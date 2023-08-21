"use serve"
import { utapi } from "uploadthing/server";

export const uploadFile = async (file:Blob) => {
    const { data } = await utapi.uploadFiles(file);
    if (!data){
        throw new Error('Unable to upload image');
    }
    return data.url
}
export const deleteFile = async (file:string) => {
    const { success } = await utapi.deleteFiles(file);
    if (!success){
        throw new Error('Unable to delete image');
    }
}