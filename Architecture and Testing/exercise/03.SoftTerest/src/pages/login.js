import {login} from "../api/users.js";

const section = document.getElementById('login-page');
const form = section.querySelector('form');
form.addEventListener('submit', loginUser)

let ctx = null;

export function showLogin(context) {
    ctx = context;
    context.showSection(section);
}

async function loginUser(evt) {
    evt.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
        return alert('Invalid username or password');
    }

    await login(email, password);
    form.reset();
    ctx.updateNav();
    ctx.goTo('/');
}