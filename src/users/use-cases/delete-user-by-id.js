/**
 * @param {string|number} id
 */
export const deleteUserById =  async (id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    const res = await fetch(url, {
        method: 'DELETE',
    });

    if (res.status !== 204 && res.headers.get('content-length') !== '0') {
        const deleteResult = await res.json();
        console.log({ deleteResult });
        return deleteResult;
    }

    return { success: true };
}