import {html} from '../lib.js'
import {login} from '../api/users.js'

const template = html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Login User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class="form-control" id="email" type="text" name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class="form-control" id="password" type="password" name="password">
                </div>
                <input type="submit" class="btn btn-primary" value="Login"/>
            </div>
        </div>
    </form>`;

let ctx;

export function loginView(context) {
    ctx = context;
    ctx.render(template);
}

async function onSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const email = formData.get('email');
    const password = formData.get('password');
    if (!email || !password) {
        return alert('All fields required!');
    }
    await login(email, password);
    evt.target.reset();
    ctx.updateNav();
    ctx.page.redirect('/catalog');
}

