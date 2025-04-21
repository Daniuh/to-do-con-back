import { User } from '../models/user';

/**
 * @param {Like<User>} localhostUser 
 * @returns {User}
 */
export const localHostUserToModel = (localhostUser) => {

    const {
        id,
        isActive,
        balance,
        avatar,
        firstName,
        lastName,
        gender,
    } = localhostUser;

    return new User({
        id,
        isActive,
        balance,
        avatar,
        firstName,
        lastName,
        gender,
    });
}
