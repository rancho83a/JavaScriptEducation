//alert('it');
import { showCreate, setupCreate } from "./create.js"
import { showEdit, setupEdit } from "./edit.js"
import { showLogin, setupLogin } from "./login.js"
import { showRegister, setupRegister } from "./register.js"
import { setupDetails } from "./details.js"
import { showHome, setupHome } from "./home.js"


const main = document.querySelector('main');

setupSection('home-page', setupHome)
setupSection('add-movie', setupCreate)
setupSection('movie-details', setupDetails)
setupSection('edit-movie', setupEdit)
setupSection('form-login', setupLogin)
setupSection('form-sign-up', setupRegister)

const links = {
    'loginLink': showLogin,
    'registerLink': showRegister,
    'homeLink': showHome,
    'createLink': showCreate,
    'logoutLink': logout
}

setupNav();
showHome();

async function logout() {
    const response = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': sessionStorage.getItem('userToken')
        },
    });
    if (response.status == 200) {
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userEmail');
        [...document.querySelectorAll('nav .user-login')].forEach(l => l.style.display = 'none');
        [...document.querySelectorAll('nav .user-guest')].forEach(l => l.style.display = 'block');
        showHome();
    } else {
        console.error(await response.json());
    }
}

function setupSection(sectionId, setup) {
    const section = document.getElementById(sectionId);
    setup(main, section);
}

function setupNav() {
        const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail != null) {
        [...document.querySelectorAll('nav .user-login')].forEach(l => l.style.display = 'block');
        [...document.querySelectorAll('nav .user-guest')].forEach(l => l.style.display = 'none');
        document.getElementById('welcome').textContent = "Welcome, " + userEmail;
    } else {
        [...document.querySelectorAll('nav .user-login')].forEach(l => l.style.display = 'none');
        [...document.querySelectorAll('nav .user-guest')].forEach(l => l.style.display = 'block');
    }
    document.querySelector('nav').addEventListener('click', (ev) => {
        ev.preventDefault();
        const view = links[ev.target.id];
        if (typeof view == 'function') {
            view();
        }
    });
    document.getElementById('createLink').addEventListener('click', (ev) => {
        if(sessionStorage.getItem('userToken')==null){
            return alert('Only logged in user can add a movie')
        }
        ev.preventDefault();
        showCreate();
    });
}
