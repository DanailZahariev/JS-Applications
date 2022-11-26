import {html} from '../lib.js'
import {register} from '../api/users.js'

const template = html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Register New User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit="${onSubmit}">
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
                <div class="form-group">
                    <label class="form-control-label" for="rePass">Repeat</label>
                    <input class="form-control" id="rePass" type="password" name="rePass">
                </div>
                <input type="submit" class="btn btn-primary" value="Register"/>
            </div>
        </div>
    </form>
    </div>`

let ctx;

export async function registerView(context) {
    ctx = context;
    ctx.render(template);
}

async function onSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePassword = formData.get('rePass');

    if (!email || !password || !rePassword) {
        return alert('All fields required!');
    }
    if (password !== rePassword) {
        return alert('Passwords don\'t, match!');
    }

    await register(email, password);
    ctx.updateNav();
    ctx.page.redirect('/catalog');

}