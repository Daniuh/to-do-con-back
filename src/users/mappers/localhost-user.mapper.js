import { User } from '../models/user';

/**
 * @param {Like<User>} localhostUser 
 * @returns {User}
 */
export const localHostUserToModel = (localhostUser) => {

    const {
        id,
        active,
        balance,
        avatar,
        firstName,
        lastName,
        gender,
    } = localhostUser;

    return new User({
        id,
        isActive: active,
        balance,
        avatar,
        firstName,
        lastName,
        gender,
    });
}
