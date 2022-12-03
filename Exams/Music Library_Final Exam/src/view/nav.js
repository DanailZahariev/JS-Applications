import {html, render} from "../lib.js";
import {getUserData} from "../utils.js";
import {logout} from "../api/users.js";


const header = document.querySelector('header');

const navTemplate = (user) => html`
    <nav>
        <div>
            <a href="/dashboard">Dashboard</a>
        </div>
        ${user ? html`
            <div class="user">
                <a href="/create">Add Album</a>
                <a @click="${onLogout}" href="javascript:void(0)">Logout</a>
            </div>` : html`
            <div class="guest">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>`}
    </nav>`;


export function updateNav() {
    const user = getUserData();
    render(navTemplate(user), header);
}

export async function onLogout() {
    await logout();
    updateNav();
    page.redirect('/dashboard');
}