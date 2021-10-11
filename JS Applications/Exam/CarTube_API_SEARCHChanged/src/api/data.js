import * as api from './api.js';

const host = 'http://localhost:3030';

api.settings.host = host;
export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//Implements Application specific request 

const endpoint = '/data/cars';

export async function getAllItems() {
    return await api.get(host + '/data/cars?sortBy=_createdOn%20desc')
}
export async function getItemById(id) {
    return await api.get(host + endpoint + '/' + id);
}

export async function createItem(item) {
    return await api.post(host + endpoint, item);
}


export async function getMyItems(id) {
    //const userId = sessionStorage.getItem('userId');
    // return await api.get(host + `/data/catalog?where=_ownerId%3D%22${userId}%22`);
    return await api.get(host + `/data/cars?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);

}

export async function editItem(id, item) {
    return await api.put(host + endpoint + '/' + id, item);
}

export async function deleteItem(id) {
    return await api.del(host + endpoint + '/' + id);
}

export async function searchByYear(query) {
    return await api.get(host + `/data/cars?where=year%3D${query}`)
}