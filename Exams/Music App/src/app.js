import {page, render} from "./lib.js";
import {updateNav} from "./views/nav.js";
import {showHome} from "./views/home.js";
import {showLogin} from "./views/login.js";
import {showRegister} from "./views/register.js";
import {showCreate} from "./views/create.js";
import {showCatalog} from "./views/catalog.js";
import {showDetails} from "./views/details.js";
import {showEdit} from "./views/edit.js";
import {showSearch} from "./views/search.js";


const main = document.querySelector('main');


page(decorateContext);
page('/', showHome);
page('/login', showLogin)
page('/register', showRegister)
page('/create', showCreate)
page('/catalog', showCatalog)
page('/catalog/:id', showDetails)
page('/edit/:id', showEdit)
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