import {showHome} from "./pages/home.js";
import {showCatalog} from "./pages/catalog.js";
import {showLogin} from "./pages/login.js";
import {showRegister} from "./pages/register.js";
import {showDetails} from "./pages/details.js";
import {showCreate} from "./pages/create.js";
import {initialize} from "./router.js";
import {logout} from "./api/users.js";

document.getElementById('views').remove();

const links = {
    '/': showHome,
    '/catalog': showCatalog,
    '/login': showLogin,
    '/register': showRegister,
    '/details': showDetails,
    '/create': showCreate,
    '/logout': onLogout
};

const router = initialize(links);
router.updateNav();

router.goTo('/');

async function onLogout() {
    await logout();
    router.updateNav();
    router.goTo('/');
}


