import {get, post} from "./api.js";
import {clearUserData, setUserData} from "../utils.js";

export async function login(email, password) {
    const user = await post('/users/login', {email, password});
    setUserData(user);
}

export async function register(email, password) {
    const user = await post('/users/register', {email, password});
    setUserData(user);
}

export async function logout() {
    get('/users/logout');
    clearUserData();
}