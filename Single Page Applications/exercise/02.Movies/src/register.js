import {showView, updateNav} from "./util.js";
import {homePage} from "./home.js";

const registerSection = document.querySelector('#form-sign-up');
const form = registerSection.querySelector('form');
form.addEventListener('submit', registerUser);

export function registerPage() {
    showView(registerSection);
}

async function registerUser(evt) {
    evt.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get("password");
    const confirmPassword = formData.get("repeatPassword");

    if (!email || !password || !confirmPassword || password !== confirmPassword) {
        alert('All fields are required');
    }

    try {
        const response = await fetch('http://localhost:3030/users/register', {
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
