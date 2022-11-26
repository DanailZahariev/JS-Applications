import * as api from "./api.js";


const endpoint = {
    'catalog': 'data/catalog',
    'getById': 'data/catalog/',
    'getMyItems': 'data/catalog?where=_ownerId%3D%22',
}

export async function createItem(data) {
    return await api.post(endpoint.catalog, data);
}

export async function getAllItems() {
    return await api.get(endpoint.catalog);
}

export async function getById(id) {
    return await api.get(endpoint.getById + id);
}

export async function updateById(id, data) {
    return await api.put(endpoint.getById + id, data);
}

export async function deleteById(id) {
    return await api.del(endpoint.getById + id);
}

export async function getUserItems() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userId = user && user._id;
    return await api.get(endpoint.getMyItems + `${userId}%22`);
}