import axios from "axios";
import { getAuth } from '@src/frontend/common/services/auth';

export const apiInstance = axios.create({ baseURL: "/api" });

apiInstance.interceptors.request.use(config => {
    const token = getAuth()
    config.headers.set('Authorization', `Bearer ${token}`);
    return config;
});
