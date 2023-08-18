import { Session } from '@src/shared/interfaces/session';
import { getItem, setItem } from '@src/shared/storage/localStorage';

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY'

export const setAuth = (session:Session) => setItem(ACCESS_TOKEN_KEY, session.accessToken);
export const getAuth = () => getItem(ACCESS_TOKEN_KEY);