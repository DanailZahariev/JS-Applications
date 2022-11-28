import {page, render} from "./lib.js";
import {updateNav} from "./view/nav.js";
import {showHome} from "./view/home.js";
import {showLogin} from "./view/login.js";
import {showRegister} from "./view/register.js";
import {showCatalog} from "./view/catalog.js";
import {showCreate} from "./view/create.js";
import {showDetails} from "./view/details.js";
import {showEdit} from "./view/edit.js";
import {showSearch} from "./view/search.js";

const main = document.querySelector('main');

page(decorateContext);
page('/', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/catalog', showCatalog);
page('/create', showCreate);
page('/catalog/:id', showDetails);
page('/edit/:id', showEdit);
page('/search', showSearch)
page.start();
updateNav();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;
    next();
}

function renderMain(content) {
    render(content, main);
}