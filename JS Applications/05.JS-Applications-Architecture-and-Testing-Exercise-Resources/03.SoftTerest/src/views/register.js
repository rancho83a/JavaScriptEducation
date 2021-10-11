import { register } from "../api/data.js"
export function setupRegister(section, navigation) {
    const form = section.querySelector('form');
    form.addEventListener('submit', onsubmit);
    section.querySelector('#logIn').addEventListener('click', onLogIn);



    return showRegister;

    async function showRegister() {
        return section;
    }

    function onLogIn(ev) {
        ev.preventDefault();
        navigation.goTo('login');
    }


    async function onsubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPassword = formData.get('repeatPassword');
        if(email.length<3){
            return alert("The email should be at least 3 characters long, have digits and special characters")
        }
        if(password.length<3){
            return alert("The password should be at least 3 characters long");
        }
        if (!email || !password) {
            return alert('All fields required');
        }
        if (password != repeatPassword){
            return alert ("Password don`t match!");
        }
            await register(email, password);
        form.reset();
        navigation.setUserNav();
        navigation.goTo('home');
    }
}