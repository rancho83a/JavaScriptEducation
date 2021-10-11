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
    <div class="container home wrapper  my-md-5 pl-md-5">
        <div class="row-form d-md-flex flex-mb-equal ">
            <div class="col-md-4">
                <img class="responsive" src="./images/idea.png" alt="">
            </div>
            <form @submit=${onSubmit} class="form-user col-md-7" action="" method="">
                <div class="text-center mb-4">
                    <h1 class="h3 mb-3 font-weight-normal">Login</h1>
                </div>
                <div class="form-label-group">
                    <label for="inputEmail">Email</label>
                    <input type="text" id="inputEmail" name="email" class="form-control" placeholder="Email" required=""
                        autofocus="">
                </div>
                <div class="form-label-group">
                    <label for="inputPassword">Password</label>
                    <input type="password" id="inputPassword" name="password" class="form-control"
                        placeholder="Password" required="">
                </div>
                <div class="text-center mb-4 text-center">
                    <button class="btn btn-lg btn-dark btn-block" type="submit">Sign In</button>
                    <p class="alreadyUser"> Don't have account? Then just
                        <a href="/register">Sign-Up</a>!
                    </p>
                </div>
                <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
            </form>
        </div>
    </div>
  
`;

export async function loginPage(ctx) {
    ctx.setColorActiveBtn('login');
    
    ctx.render(loginTemplate(onsubmit));
    //console.log('login Page');
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