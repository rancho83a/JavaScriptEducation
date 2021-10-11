import * as api from './api.js';

const host = 'http://localhost:3030';

api.settings.host = host;
export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//Implements Application specific request 

const endpoint = '/data/wiki';

export async function getHomeInfo() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc&distinct=category')
}

export async function getAllItems() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc')

}
export async function searchByTitle(query) {
   // return await api.get(host + `/data/cars?where=year%3D${query}`)
    return await api.get(host + `/data/wiki?where=title%20LIKE%20%22${query}%22`)
}





export async function getItemById(id) {
    return await api.get(host + endpoint + '/' + id);
}

export async function createItem(item) {
    return await api.post(host + endpoint, item);
}




export async function editItem(id, item) {
    return await api.put(host + endpoint + '/' + id, item);
}

export async function deleteItem(id) {
    return await api.del(host + endpoint + '/' + id);
}