import { localHostUserToModel } from '../mappers/localhost-user.mapper';
import { User } from '../models/user';

/**
 * @param {number} page 
 * @returns {Promise<User[]>}
 */
export const loadUsersByPage = async (page = 1) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users?page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    
    if (Array.isArray(data)) {
        const users = data.map(localHostUserToModel);
        return users;
    } else {
        return []; // Si no es un array, devuelve un arreglo vacío
    }
}