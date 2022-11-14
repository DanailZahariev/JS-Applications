import {showView, updateNav} from "./util.js";
import {homePage} from "./home.js";

const loginSection = document.querySelector('#form-login');
const form = loginSection.querySelector('form');
form.addEventListener('submit', userLogin);

export function loginPage() {
    showView(loginSection);
}

async function userLogin(evt) {
    evt.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));

        form.reset();
        updateNav();
        await homePage();

    } catch (e) {
        alert(e.message);
    }
}