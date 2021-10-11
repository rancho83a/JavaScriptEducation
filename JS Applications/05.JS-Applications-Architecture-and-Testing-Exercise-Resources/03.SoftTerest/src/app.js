import { logout as apiLogout } from './api/data.js'
import { setupHome } from "./views/home.js"
import { setupLogin } from "./views/login.js"
import { setupRegister } from "./views/register.js"
import { setupDetails } from "./views/details.js"
import { setupDashboard } from "./views/dashboard.js"
import { setupCreate } from "./views/create.js"
//setup views
//setup links - да сложи линкове към бутоните в навигацията
//show appropriate navigation based on user session 
//start app in default view - home-page;

//чрeз ф-та СЕТЪП - ще се върне своята ф-я за визуализация (exp showDetails...) i trqbwa da gi save in collection i da gi asociirame s 
//neshto chrez koeto da gi vikame View, naprimer po IME

const views = {};
const links = {};
const main = document.querySelector('main');
const nav = document.querySelector('nav');

const navigation = {
    goTo,
    setUserNav
};

registerView('home', document.getElementById('home-page'), setupHome, 'homeLink');
registerView('login', document.getElementById('login-page'), setupLogin, 'loginLink');
registerView('register', document.getElementById('register-page'), setupRegister, 'registerLink');
registerView('dashboard', document.getElementById('dashboard-holder'), setupDashboard, 'dashboardLink');
registerView('create', document.getElementById('create-page'), setupCreate, 'createLink' ); // Est link?
registerView('details', document.getElementById('details-page'), setupDetails );
document.getElementById('logoutBtn').addEventListener('click',logout);

document.getElementById('views').remove();

setupNavigation();
//start app
goTo('home');

async function logout(ev) {
    ev.preventDefault();
    await apiLogout();
    navigation.setUserNav();
    navigation.goTo('home');
}

function registerView(name, section, setup, linkId) {
    const view = setup(section, navigation); //vernet showLogin etc...
    views[name] = view;
    if (linkId) {
        links[linkId] = name;
    }
}

async function goTo(name, ...params) {
    main.innerHTML = "";
    const view = views[name];
    const section = await view(...params);
    main.appendChild(section);
}

function setUserNav() {
    const token = sessionStorage.getItem('authToken');
    if (token != null) {
        [...nav.querySelectorAll('.user-nav')].forEach(l => l.style.display = 'list-item');
        [...nav.querySelectorAll('.guest-nav')].forEach(l => l.style.display = 'none')

    } else {
        [...nav.querySelectorAll('.user-nav')].forEach(l => l.style.display = 'none');
        [...nav.querySelectorAll('.guest-nav')].forEach(l => l.style.display = 'list-item')
    }
}

function setupNavigation() {

    setUserNav();
    nav.addEventListener('click', (ev) => {
        const viewName = links[ev.target.id]
        if (viewName) {
            ev.preventDefault();
            goTo(viewName);
        }
    })
}




