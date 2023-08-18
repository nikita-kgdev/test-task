import { apiInstance } from '@src/shared/services/api/instance';
import { Banner } from '@src/shared/interfaces/banner';

export const createClick = async (banner:Banner&{screenSize:string, index:number}) => (await apiInstance.post('/stats/click',banner)).data