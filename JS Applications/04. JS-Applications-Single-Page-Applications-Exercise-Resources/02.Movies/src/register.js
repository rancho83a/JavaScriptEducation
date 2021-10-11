import { showHome } from "./home.js";

let main;
let section;

export function setupRegister(targetMain, targetSection) {
    main = targetMain;
    section = targetSection;
    section.querySelector('form').addEventListener('submit', onsubmit);


}

export function showRegister() {
    main.innerHTML = "";
    main.appendChild(section);
}


async function onsubmit(ev) {
    ev.preventDefault();
    const data = new FormData(ev.target);
    const email = data.get('email');
    const password = data.get('password')
    const rePass = data.get('repeatPassword')

    if (email == '' || password == '') {
        return alert('All fileds required')
    }

    if (password != rePass) {
        return alert('Passwords don\'t match');
    }

    const response = await fetch("http://localhost:3030/users/register", {
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
        alert(err.message);
    }
}