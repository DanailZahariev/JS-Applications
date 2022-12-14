import {del, get, post, put} from "./api.js";

export async function getAll() {
    return get('/data/offers?sortBy=_createdOn%20desc');
}

export async function getById(id) {
    return get('/data/offers/' + id);
}

export async function deleteById(id) {
    return del('/data/offers/' + id);
}

export async function addNewOffer(data) {
    return post('/data/offers', data);
}

export async function editOffer(id, data) {
    return put('/data/offers/' + id, data);
}

export async function apply(offerId) {
    return post('/data/applications', {offerId});
}

export async function getTotalCount(offerId) {
    return get(`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`);
}

export async function getOwnApplies(offerId, userId) {
    return get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}