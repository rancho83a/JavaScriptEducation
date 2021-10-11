import { render } from '../node_modules/lit-html/lit-html.js';

import page from '../node_modules/page/page.mjs';
import { logout } from './api/data.js';

import { homePage } from './views/home.js'
import { catalogPage } from './views/catalog.js'
import { createPage } from './views/create.js'
import { detailsPage } from './views/details.js'
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { myPage } from './views/profile.js';
import { registerPage } from './views/register.js';
import {searchPage } from './views/search.js';
//bonus
import { notify } from './notification.js';
import { getUserData } from './utiity.js';


const main = document.querySelector('main');
//page('/', decorateCtx,guestUserOnly, homePage);
page('/', decorateCtx, homePage);
page('/home', decorateCtx, homePage);
page('/login', decorateCtx, loginPage);
page('/register', decorateCtx, registerPage);
page('/catalog', decorateCtx, catalogPage);
page('/create', decorateCtx, createPage);
page('/details/:id', decorateCtx, detailsPage);
page('/edit/:id', decorateCtx, editPage);
page('/profile', decorateCtx, myPage);
page('/search', decorateCtx, searchPage);

document.getElementById('logoutBtn').addEventListener('click', async () => {

    await logout();
    setUserNav();
    page.redirect('/');
});
setUserNav();

//start App
page.start();


// function guestUserOnly(ctx,next){
//     const token = sessionStorage.getItem('authToken');
//     if(token!=null){
//         //obyazatelno FETURN ,inache poudet next line ctx.render
//         return ctx.page.redirect('/catalog');
//     }
//     next();
// }
//через ету функцию ми передаем в каждое вью готовий РЕНДЕР с прикрепленним "контейнером" (через добавление в контекст  доп.свойство-функцию ctx.render),
// поетому даже не надо импортировать рендер в каждом вью


function decorateCtx(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    //ctx.setColorActiveBtn = setColorActiveBtn;
    ctx.user=getUserData();
    next();//
}

function setUserNav() {
    const user=getUserData();
    if (user) {
        document.getElementById('profile').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
        document.getElementById('welcome').textContent = 'Welcome ' + user.username;

    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}

// function setUserNav() {
//     const userId = sessionStorage.getItem('userId');
//     if (userId != null) {
//         [...document.querySelectorAll('.user')].forEach(u=>u.style.display = 'block');
//         [...document.querySelectorAll('.guest')].forEach(u=>u.style.display = 'none');
//     } else {
//         [...document.querySelectorAll('.user')].forEach(u=>u.style.display = 'none');
//         [...document.querySelectorAll('.guest')].forEach(u=>u.style.display = 'block');
//     }
// }
// function setUserNav() {
//     // const userId = sessionStorage.getItem('user');
//     const email = sessionStorage.getItem('email');
//     if (email != null) {
//         document.querySelector('.user').style.display = '';
//         document.querySelector('.guest').style.display = 'none';
//         document.getElementById('nav-email').textContent = 'Welcome, ' + email;
//     } else {
//         document.querySelector('.user').style.display = 'none';
//         document.querySelector('.guest').style.display = '';
//     }
// }
// function setColorActiveBtn(id) {
//     const nav=document.querySelector('nav');
//     [...nav.querySelectorAll('a')].forEach(b => {
//         if (b.id == id) {
//             b.classList.add('active');
//         } else {
//             b.classList.remove('active');
//         }
//     });
// }