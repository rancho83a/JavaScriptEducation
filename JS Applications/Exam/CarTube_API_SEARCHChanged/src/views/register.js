import { html } from "../../node_modules/lit-html/lit-html.js"
import { register } from "../api/data.js"

const registerTemplate = (onSubmit) => html`
     <section id="register">
            <div class="container">
                <form @submit=${onSubmit} id="register-form">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr>

                    <p>Username</p>
                    <input type="text" placeholder="Enter Username" name="username" required>

                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password" required>

                    <p>Repeat Password</p>
                    <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                    <hr>

                    <input type="submit" class="registerbtn" value="Register">
                </form>
                <div class="signin">
                    <p>Already have an account?
                        <a href="/login">Sign in</a>.
                    </p>
                </div>
            </div>
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
        //const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repeatPass = formData.get('repeatPass').trim();
       // const gender = formData.get("gender").trim();

        if (!username || !password || !repeatPass) {
            return alert('All fields required');
            //return ctx.render(loginTemplate(onsubmit, 'All fields required',!email, !password))
        }

        if (password != repeatPass) {
            return alert("Don't confirm")
        }
        ctx.render(registerTemplate(onsubmit));
        await register(username, password);
        ctx.setUserNav();

        ctx.page.redirect('/catalog');
    }
}