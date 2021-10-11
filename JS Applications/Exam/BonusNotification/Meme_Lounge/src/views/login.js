import { html } from "../../node_modules/lit-html/lit-html.js"
import { login } from "../api/data.js"
import { notify } from "../notification.js";

const loginTemplate = (onSubmit) => html`
<section id="login">
    <form @submit=${onSubmit} id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>
`;


export async function loginPage(ctx) {

    ctx.render(loginTemplate(onsubmit));
    //console.log('login Page');
    //ctx.setColorActiveBtn('loginLink');
    async function onsubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        try {
            if (!email || !password) {
               // return alert('All fields required');
                //return ctx.render(loginTemplate(onsubmit, 'All fields required',!email, !password))
                throw new Error('All fields required');
            }
            ctx.render(loginTemplate(onsubmit));


            await login(email, password);
            ctx.setUserNav();

            ctx.page.redirect('/catalog');
        } catch (err) {
            notify(err.message);
        }
    }
}