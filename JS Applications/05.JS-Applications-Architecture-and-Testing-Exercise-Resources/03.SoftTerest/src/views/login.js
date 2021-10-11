import { login } from "../api/data.js"

export function setupLogin(section, navigation) {
    const form = section.querySelector('form');
    form.addEventListener('submit', onsubmit);
    section.querySelector('#signIn').addEventListener('click', onSignIn)
    return showLogin;

    async function showLogin() {
        return section;
    }
    
    function onSignIn(ev) {
        ev.preventDefault();
        navigation.goTo('register');
    }
    async function onsubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        await login(email, password);
        form.reset();
        navigation.setUserNav();
        navigation.goTo('home');
    }
}