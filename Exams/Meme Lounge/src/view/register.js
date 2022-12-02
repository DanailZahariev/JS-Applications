import {html} from "../lib.js";
import {createSubmitHandler} from "../utils.js";
import {register} from "../api/data.js";
import {notification} from "./notification.js";

const registerTemplate = (onRegister) => html`
    <section id="register">
        <form @submit="${onRegister}" id="register-form">
            <div class="container">
                <h1>Register</h1>
                <label for="username">Username</label>
                <input id="username" type="text" placeholder="Enter Username" name="username">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="Enter Email" name="email">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <label for="repeatPass">Repeat Password</label>
                <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                <div class="gender">
                    <input type="radio" name="gender" id="female" value="female">
                    <label for="female">Female</label>
                    <input type="radio" name="gender" id="male" value="male" checked>
                    <label for="male">Male</label>
                </div>
                <input type="submit" class="registerbtn button" value="Register">
                <div class="container signin">
                    <p>Already have an account?<a href="/login">Sign in</a>.</p>
                </div>
            </div>
        </form>
    </section>`;


export function showRegister(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    async function onRegister({username, email, password, repeatPass, gender}) {

        if (!email || !username || !password || !repeatPass) {
            return notification("All fields are required!");
        }

        if (password !== repeatPass) {
            return notification('Password don\'t match!');
        }

        await register(username, email, password, gender);
        ctx.updateNav();
        ctx.page.redirect('/catalog');
    }
}