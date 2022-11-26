import {page, render} from './lib.js'
import {catalogView} from "./views/catalog.js";
import {createView} from "./views/create.js";
import {detailsView} from "./views/details.js";
import {editView} from "./views/edit.js";
import {loginView} from "./views/login.js";
import {registerView} from "./views/register.js";
import {myFurnitureView} from "./views/myFurniture.js";
import {logout} from "./api/users.js";

const root = document.querySelector('.container');
document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(renderPage)
page('/', catalogView);
page('/catalog', catalogView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/login', loginView);
page('/register', registerView);
page('/my-furniture', myFurnitureView);
page('*', catalogView)
page.start();
updateNav();

function renderPage(ctx, next) {
    ctx.updateNav = updateNav;
    ctx.render = (content) => render(content, root);
    next();
}

function updateNav() {
    const user = sessionStorage.getItem('user');
    if (user) {
        document.querySelector('#user').style.display = 'inline-block';
        document.querySelector('#guest').style.display = 'none';
    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'inline-block';
    }
}

async function onLogout() {
    await logout();
    updateNav();
    page.redirect('/');
}