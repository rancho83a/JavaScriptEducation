import { html } from "../../node_modules/lit-html/lit-html.js"
import { login } from "../api/data.js"

const loginTemplateExp = (onSubmit) => html`
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
const loginTemplate = (onSubmit) => html`
  
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
        if (!email || !password) {
          return  alert('All fields required');
            //return ctx.render(loginTemplate(onsubmit, 'All fields required',!email, !password))
        }
        ctx.render(loginTemplate(onsubmit));
        await login(email,password);
        ctx.setUserNav();

        ctx.page.redirect('/catalog');
    }
}