import {del, get, post, put} from "./api.js";
import {clearUserData, setUserData} from "../utils.js";

export async function login(email, password) {
    const user = await post('/users/login', {email, password});
    setUserData(user);
}

export async function register(username, email, password, gender) {
    const user = await post('/users/register', {email, password, username, gender});
    setUserData(user);
}

export async function logout() {
    get('/users/logout');
    clearUserData();
}

export async function getAllMemes() {
    return get('/data/memes?sortBy=_createdOn%20desc');
}

export async function createMeme(data) {
    return post('/data/memes', data);
}

export async function getMemeById(id) {
    return get('/data/memes/' + id);
}

export async function deleteMemeById(id) {
    return del('/data/memes/' + id);
}

export async function editMemeById(id, data) {
    return put('/data/memes/' + id, data);
}

export async function getUserMemes(userId) {
    return get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}