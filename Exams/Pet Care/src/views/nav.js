import {html, page, render} from "../lib.js";
import {getUserData} from "../utils.js";
import {logout} from "../api/user.js";

const header = document.querySelector('header');

const navTemplate = (user) => html`
    <nav>
        <section class="logo">
            <img src="./images/logo.png" alt="logo">
        </section>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/catalog">Dashboard</a></li>
            ${!user ? html`
                        <li class="guest"><a href="/login">Login</a></li>
                        <li class="guest"><a href="/register">Register</a></li>`
                    : html`
                        <li class="user"><a href="/create">Create Postcard</a></li>
                        <li @click="${onLogout}" class="user"><a href="javascript:void(0)">Logout</a>
                        </li>`}
        </ul>
    </nav>`;

export function updateNav() {
    const user = getUserData();
    render(navTemplate(user), header);
}

async function onLogout() {
    await logout()
    updateNav();
    page.redirect('/');
}