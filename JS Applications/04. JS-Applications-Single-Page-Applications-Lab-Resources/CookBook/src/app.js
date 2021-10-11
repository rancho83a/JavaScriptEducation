import { showCatalog, setupCatalog } from "./catalog.js";
import { showLogin, setupLogin } from "./login.js";
import { showRegister, setupRegister } from "./register.js";
import { showCreate, setupCreate } from "./create.js";
import { setupDetails } from "./details.js";
import {setupEdit} from "./edit.js"

main();

function main() {
    setUserNav();

    const main = document.querySelector('main');
    const catalogSection = document.getElementById('catalogSection');
    const loginSection = document.getElementById('loginSection');
    const registerSection = document.getElementById('registerSection');
    const createSection = document.getElementById('createSection');
    const detailsSection = document.getElementById('detailsSection');
    const editSection = document.getElementById('editSection');
    const nav = document.querySelector('nav');

    const links = {
        'catalogLink': showCatalog,
        'loginLink': showLogin,
        'registerLink': showRegister,
        'createLink': showCreate,
    }

    setupCatalog(main, catalogSection, setColorActiveBtn);
    setupLogin(main, loginSection, setColorActiveBtn);
    setupRegister(main, registerSection, setColorActiveBtn);
    setupCreate(main, createSection, setColorActiveBtn);
    setupDetails(main, detailsSection, setColorActiveBtn);
    setupEdit(main, editSection, setColorActiveBtn);

    setupNavigation();
    showCatalog();

    function setColorActiveBtn(id) {
        [...nav.querySelectorAll('a')].forEach(b => {
            if (b.id == id) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });
    }

    function setupNavigation() {
        document.getElementById('logoutBtn').addEventListener('click', logout);

        nav.addEventListener('click', (ev) => {
            if (ev.target.tagName == 'A') {
                const view = links[ev.target.id];
                if (typeof view == 'function') {
                    ev.preventDefault();
                    view();
                }
            }
        });
    }
    async function logout() {
        const response = await fetch('http://localhost:3030/users/logout', {
            method: 'get',
            headers: {
                'X-Authorization': sessionStorage.getItem('authToken')
            },
        });
        if (response.status == 200) {
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('userEmail');
            setUserNav();
            showCatalog();
        } else {
            console.error(await response.json());
        }
    }

    function setUserNav() {
        if (sessionStorage.getItem('authToken') != null) {
            document.getElementById('user').style.display = 'inline-block';
            document.getElementById('guest').style.display = 'none';
        } else {
            document.getElementById('user').style.display = 'none';
            document.getElementById('guest').style.display = 'inline-block';
        }
    }

}



