import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { logout } from './api/data.js';

import { createPage } from './views/create.js'
import { dashboardPage } from './views/dashboard.js'
import { detailsPage } from './views/details.js'
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { myPage } from './views/my-furniture.js';
import { registerPage } from './views/register.js';

//import * as api from './api/data.js';
//window.api=api;

//ищем елемент, в котором будем рендить и которий подаем в renderMiddleWare(ctx, next) (создана для того, чтоби передать в каждий view етот елемент)
//иначе если его брать вкаждом view, то в будущем, если поменяется в index.html етот контейнер, - то coupling - надо менять везде, а так только тут:
const main = document.querySelector('.container')


page('/', decorateCtx, dashboardPage);

page('/', decorateCtx, dashboardPage);
page('/create', decorateCtx, createPage);
page('/login', decorateCtx, loginPage);
page('/register', decorateCtx, registerPage);
page('/details/:id', decorateCtx, detailsPage);
page('/edit/:id', decorateCtx, editPage);
page('/my-furniture', decorateCtx, myPage);

 document.getElementById('logoutBtn').addEventListener('click', async () => {

    await logout();
    setUserNav();
    page.redirect('/');
});
setUserNav();

//start App
page.start();

//через ету функцию ми передаем в каждое вью готовий РЕНДЕР с прикрепленним "контейнером" (через добавление в контекст  доп.свойство-функцию ctx.render),
// поетому даже не надо импортировать рендер в каждом вью

//Переименовать  renderMiddleWare в 

function decorateCtx(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    ctx.setColorActiveBtn = setColorActiveBtn;
    next();//
}

function setUserNav() {
    const userId = sessionStorage.getItem('userId');
    if (userId != null) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

function setColorActiveBtn(id) {
    const nav=document.querySelector('nav');
    [...nav.querySelectorAll('a')].forEach(b => {
        if (b.id == id) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
}