import {register} from "../api/users.js";

const section = document.getElementById('register-page');
const form = section.querySelector('form');
form.addEventListener('submit', registerUser)

let ctx = null;

export function showRegister(context) {
    ctx = context;
    context.showSection(section);
}

async function registerUser(evt) {
    evt.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('repeatPassword');
    if (!email || !password || password !== rePass) {
        return alert('Invalid data or passwords don\'t match!');
    }

    await register(email, password);
    form.reset();
    ctx.updateNav();
    ctx.goTo('/');
}