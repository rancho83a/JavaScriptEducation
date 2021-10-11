import * as api from "./api/data.js";
import { render } from "../node_modules/lit-html/lit-html.js"
import page from "../node_modules/page/page.mjs "
import { homePage } from "./views/home.js";
import { browsePage } from "./views/browse.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { myTeamsPage} from "./views/myTeams.js"


//window.api = api;

const main = document.querySelector('main');
page('/', decorateCtx, homePage);
page('/index.thml', decorateCtx, homePage);
page('/browse', decorateCtx, browsePage);
page('/myTeams', decorateCtx, myTeamsPage);
page('/login', decorateCtx, loginPage);
page('/register', decorateCtx, registerPage);
page('/create', decorateCtx, createPage);
page('/details/:id', decorateCtx, detailsPage);
page('/edit/:id', decorateCtx, editPage);


document.getElementById('logoutBtn').addEventListener('click', async () => {

    await api.logout();
    setUserNav();
    page.redirect('/');
});


setUserNav();
page.start();


function decorateCtx(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    ctx.isUser = sessionStorage.getItem('userId') != null;

    //ctx.setColorActiveBtn = setColorActiveBtn;
    next();//
}

function setUserNav() {
    const userId = sessionStorage.getItem('userId');
    if (userId != null) {
        [...document.querySelectorAll('nav a.user')].forEach(e => e.style.display = 'block');
        [...document.querySelectorAll('nav a.guest')].forEach(e => e.style.display = 'none');
    } else {
        [...document.querySelectorAll('nav a.user')].forEach(e => e.style.display = 'none');
        [...document.querySelectorAll('nav a.guest')].forEach(e => e.style.display = 'block');
    }
}