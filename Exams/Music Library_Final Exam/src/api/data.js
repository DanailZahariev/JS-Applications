import {del, get, post, put} from "./api.js";

export async function getAll() {
    return get('/data/albums?sortBy=_createdOn%20desc');
}

export async function addAlbum(data) {
    return post('/data/albums', data);
}

export async function getTotalCount(albumId) {
    return get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`);
}

export function getById(id) {
    return get('/data/albums/' + id);
}

export async function getOwnLikes(albumId, userId) {
    return get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export function deleteById(id) {
    return del('/data/albums/' + id);
}

export async function like(albumId) {
    return post('/data/likes', {albumId});
}

export async function editAlbum(id, data) {
    return put('/data/albums/' + id, data);
}