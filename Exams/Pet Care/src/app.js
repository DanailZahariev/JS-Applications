import {page, render} from "./lib.js";
import {homeView} from "./views/home.js";
import {showCatalog} from "./views/catalog.js";
import {showLogin} from "./views/login.js";
import {showRegister} from "./views/register.js";
import {updateNav} from "./views/nav.js";
import {getUserData} from "./utils.js";
import {showDetails} from "./views/details.js";
import {showEdit} from "./views/edit.js";
import {showCreate} from "./views/create.js";

const main = document.getElementById('content');

page(decorateContext);
page('/', homeView);
page('/catalog', showCatalog);
page('/catalog/:id', showDetails);
page('/edit/:id', showEdit);
page('/create', showCreate);
page('/login', showLogin);
page('/register', showRegister);
page.start();
updateNav();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;

    const user = getUserData();
    if (user) {
        ctx.user = user;
    }
    next();
}

function renderMain(content) {
    render(content, main);
}
