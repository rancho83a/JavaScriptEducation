import { html } from "../../node_modules/lit-html/lit-html.js"
import { register } from "../api/data.js"

const registerTemplate = (onSubmit, errMsg) => html`
<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form @submit=${onSubmit} id="register-form" class="main-form pad-large">
            ${errMsg ? html`<div class="error">${errMsg}</div>` : ''}
            <label>E-mail: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
        </footer>
    </article>
</section>
`;


export async function registerPage(ctx) {
    //console.log('register Page');

    ctx.render(registerTemplate(onSubmit));
    // ctx.setColorActiveBtn('registerLink');

    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('repass').trim();
        const username = formData.get('username').trim();
        try{
        if (!email || !password || !repass || !username) {
           throw new Error('All fileds required')
            // return ctx.render(registerTemplate(onSubmit, 'All fileds required'));
            // return alert('All fileds required')
        }
        if (password != repass) {
            throw new Error('The password do not confirmed')
            // return ctx.render(registerTemplate(onSubmit, 'The password do not confirmed'));
            // return alert('The password do not confirmed')
        }


        await register(email, username, password);
        ctx.setUserNav();
       // ctx.page.redirect('/myTeams')
        ctx.page.redirect('/')
    } catch(err){
        ctx.render(registerTemplate(onSubmit, err.message));
    }
    }
}