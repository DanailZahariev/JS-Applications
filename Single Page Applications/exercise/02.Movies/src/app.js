import {homePage} from "./home.js";
import {loginPage} from "./login.js";
import {registerPage} from "./register.js";
import {createPage} from "./create.js";
import {updateNav} from "./util.js";

const routes = {
    '/': homePage,
    '/login': loginPage,
    '/logout': logout,
    '/register': registerPage,
    '/create': createPage
};

document.querySelector('nav').addEventListener('click', navigate);
document.querySelector('#add-movie-button a').addEventListener('click', navigate);

function navigate(evt) {
    if (evt.target.tagName === 'A' && evt.target.href) {
        evt.preventDefault();
        const url = new URL(evt.target.href);
        const view = routes[url.pathname];
        if (typeof view === 'function') {
            view();
        }
    }
}

function logout() {
    localStorage.removeItem('user');
    updateNav();
}

updateNav();
await homePage();
