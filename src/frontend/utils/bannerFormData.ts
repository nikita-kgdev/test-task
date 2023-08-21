import { CreateBanner } from '@src/shared/interfaces/banner';

export const createBannerFormData = (banner:Partial<CreateBanner>) => {
    const data = new FormData();
    for (const [key, value] of Object.entries(banner)) {
        if (value){
            if (value instanceof Blob){
                data.append(key, value, (Math.random() + 1).toString(36).substring(7));
                continue;
            }
            data.append(key, String(value));
        }
    }
    return data;
}