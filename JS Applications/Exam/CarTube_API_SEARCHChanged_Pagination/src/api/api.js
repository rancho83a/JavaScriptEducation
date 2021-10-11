import { clearUserData, getUserData, setUserData } from "../utiity.js"
export const settings = {
    host: ''
};

async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (response.ok == false) {
            const error = await response.json();
            alert(error.message);
            throw new Error(error.message);
        }

        try {
            return await response.json();
        } catch (err) {
            return response;
        }
    } catch (err) {
        alert(err.message);
        throw new Error(err.message);
    }
}

function createOptions(method = 'get', data) {
    const result = {
        method,
        headers: {}
    };

    if (data) {
        result.headers['Content-Type'] = 'application/json';
        result.body = JSON.stringify(data);
    }

    //const token = sessionStorage.getItem('authToken');
    const user = getUserData();
    if (user) {
        result.headers['X-Authorization'] = user.accessToken;
    }

    return result;
}

export async function get(url) {
    return request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions('post', data));
}

export async function put(url, data) {
    return request(url, createOptions('put', data));
}

export async function del(url) {
    return request(url, createOptions('delete'));
}

export async function login(username, password) {
    const response = await post(settings.host + '/users/login', { username, password });

    // sessionStorage.setItem('authToken', response.accessToken);
    // sessionStorage.setItem('userId', response._id);
    // sessionStorage.setItem('username', response.username);

    setUserData(response);
    return response;
}

export async function register(username, password) {
    const response = await post(settings.host + '/users/register', { username, password });

    // sessionStorage.setItem('authToken', response.accessToken);
    // sessionStorage.setItem('username', response.username);
    // sessionStorage.setItem('userId', response._id);
    setUserData(response);

    return response;
}

export async function logout() {
    const response = await get(settings.host + '/users/logout');
    clearUserData();
    return response;
    // sessionStorage.removeItem('authToken');
    // sessionStorage.removeItem('email');
    // sessionStorage.removeItem('userId');
    // sessionStorage.removeItem('username');
    // sessionStorage.removeItem('userGender');
}