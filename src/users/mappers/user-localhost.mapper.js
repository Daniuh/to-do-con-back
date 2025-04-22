import { User } from '../models/user';

/**
 * @param {User} user  
 */
export const userLocalhost = (user) => {
    const {
        id,
        isActive,
        balance,
        avatar,
        firstName,
        lastName,
        gender
    } = user;

    return {
        id,
        active: isActive,
        balance,
        avatar,
        firstName,
        lastName,
        gender
    };
}