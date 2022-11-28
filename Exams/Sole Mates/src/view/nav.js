import {html, render} from "../lib.js";
import {logout} from "../api/users.js";
import {getUserData} from "../utils.js";

const header = document.querySelector('header');

const navTemplate = (user) => html`
    <nav>
        <div>
            <a href="/catalog">Dashboard</a>
            <a href="/search">Search</a>
        </div>
        ${user ? html`
            <div class="user">
                <a href="/create">Add Pair</a>
                <a @click="${onLogout}" href="javascript:void(0)">Logout</a>
            </div>` : html`
            <div class="guest">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>`}
    </nav>`


export function updateNav() {
    const user = getUserData();
    render(navTemplate(user), header);
}

async function onLogout() {
    await logout()
    updateNav();
    page.redirect('/');
}