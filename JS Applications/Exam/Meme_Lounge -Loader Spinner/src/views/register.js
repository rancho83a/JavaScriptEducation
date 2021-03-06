import { html } from "../../node_modules/lit-html/lit-html.js"
import { register } from "../api/data.js"

const registerTemplate = (onSubmit) => html`
    <section id="register">
        <form @submit=${onSubmit} id="register-form">
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
    </section>
`;


export async function registerPage(ctx) {

    ctx.render(registerTemplate(onsubmit));
    //console.log('login Page');
    //ctx.setColorActiveBtn('loginLink');
    async function onsubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const username = formData.get('username').trim();
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repeatPass = formData.get('repeatPass').trim();
        const gender = formData.get("gender").trim();

        if (!username || !email || !password || !repeatPass || !gender) {
            return alert('All fields required');
            //return ctx.render(loginTemplate(onsubmit, 'All fields required',!email, !password))
        }

        if (password != repeatPass) {
            return alert("Don't confirm")
        }
        ctx.render(registerTemplate(onsubmit));
        await register(username, email, password, gender);
        ctx.setUserNav();

        ctx.page.redirect('/catalog');
    }
}