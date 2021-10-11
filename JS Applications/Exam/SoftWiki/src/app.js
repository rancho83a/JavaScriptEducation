
import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { logout } from './api/data.js';

import { homePage } from './views/home.js'
import { catalogPage } from './views/catalog.js'
import { createPage } from './views/create.js'
import { detailsPage } from './views/details.js'
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import {searchPage } from './views/search.js';




const main = document.getElementById('main-content');
//page('/', decorateCtx,guestUserOnly, homePage); esli nado tolko dlq userov
page('/', decorateCtx, homePage);
page('/home', decorateCtx, homePage);
page('/catalog', decorateCtx, catalogPage);
page('/create', decorateCtx, createPage);
page('/login', decorateCtx, loginPage);
page('/register', decorateCtx, registerPage);
page('/details/:id', decorateCtx, detailsPage);
page('/edit/:id', decorateCtx, editPage);
page('/search', decorateCtx, searchPage);


document.getElementById('logoutBtn').addEventListener('click', async () => {

    await logout();
    setUserNav();
    page.redirect('/');
});
setUserNav();

//start App
page.start();



function decorateCtx(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    //ctx.setColorActiveBtn = setColorActiveBtn;
    next();
}

function setUserNav() {
    const userId = sessionStorage.getItem('userId');
    if (userId != null) {
        document.getElementById('user').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}