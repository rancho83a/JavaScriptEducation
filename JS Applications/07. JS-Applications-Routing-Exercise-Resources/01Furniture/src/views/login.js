import { html } from "../../node_modules/lit-html/lit-html.js"
import { login } from "../api/data.js"

const loginTemplate = (onsubmit, errMsg, invalidEmail, invalidPas) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onsubmit}>
    <div class="row space-top">
        <div class="col-md-4">

        ${errMsg ? html`<div class="form-group"> <p>${errMsg}</p></div>` : ''}


            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class=${'form-control' + (invalidEmail ? ' is-invalid' : '' )} id="email" type="text"
                    name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class=${'form-control' + (invalidPas ? ' is-invalid' : '' )} id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>
`;


export async function loginPage(ctx) {
    
    ctx.render(loginTemplate(onsubmit));
    //console.log('login Page');
    ctx.setColorActiveBtn('loginLink');
    async function onsubmit(ev) {
        ev.preventDefault();
        
        const formData = new FormData(ev.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        if (!email || !password) {
            return ctx.render(loginTemplate(onsubmit, 'All fields required',!email, !password))
        }
        ctx.render(loginTemplate(onsubmit, '',false, false));
        await login(email,password);
        ctx.setUserNav();

        ctx.page.redirect('/');
    }
}