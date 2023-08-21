"use serve"
import * as crypto from 'crypto';

const getHash = (password:string, salt:string) => {
    return crypto.pbkdf2Sync(password, salt,
        1000, 64, `sha512`).toString(`hex`)
}

export const passwordHashCreate = (password: string) => {
    const passwordSalt = crypto.randomBytes(16).toString('hex');
    const passwordHash = getHash(password, passwordSalt);
    return { passwordSalt, passwordHash }
}
export const passwordHashValidate = (passwordAttempt: string, salt:string, hash:string) => {
    return hash === getHash(passwordAttempt, salt);
}