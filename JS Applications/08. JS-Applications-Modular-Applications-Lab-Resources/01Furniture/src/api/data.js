import * as api from './api.js';

const host = 'http://localhost:3030';

api.settings.host = host;
export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//Implements Application specific request 

const endpoint = '/data/catalog';

export async function getAllItems(searchParam) {

    if (searchParam) {
        return await api.get(host + endpoint+'?where='+ encodeURIComponent(`make LIKE "${searchParam}"`))
    } else {
        return await api.get(host + endpoint)
    }
}
export async function getItemById(id) {
    return await api.get(host + endpoint + '/' + id);
}

export async function createItem(item) {
    return await api.post(host + endpoint, item);
}


export async function getMyItems() {
    const userId = sessionStorage.getItem('userId');
    return await api.get(host + `/data/catalog?where=_ownerId%3D%22${userId}%22`);
}

export async function editItem(id, item) {
    return await api.put(host + endpoint + '/' + id, item);
}

export async function deleteItem(id) {
    return await api.del(host + endpoint + '/' + id);
}