import { showHome } from "./home.js";

let main;
let section;
async function onsubmit(ev) {
    ev.preventDefault();
    const data = new FormData(ev.target);
    const email = data.get('email');
    const password = data.get('password')
    try {

        const response = await fetch("http://localhost:3030/users/login", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            ev.target.reset();
            const data = await response.json();
            sessionStorage.setItem('userToken', data.accessToken);
            sessionStorage.setItem('userEmail', data.email);
            sessionStorage.setItem('userId', data._id);
            [...document.querySelectorAll('nav .user-login')].forEach(l => l.style.display = 'block');
            [...document.querySelectorAll('nav .user-guest')].forEach(l => l.style.display = 'none');
            document.getElementById('welcome').textContent = "Welcome, " + data.email;
            showHome();
        } else {
            const err = await response.json();
            throw new Error(err.message)
        }
    } catch (err) {
        alert(err.message);

    }
}

export function setupLogin(targetMain, targetSection) {
    main = targetMain;
    section = targetSection;
    section.querySelector('form').addEventListener('submit', onsubmit);

}

export function showLogin() {

    main.innerHTML = "";
    main.appendChild(section);

}