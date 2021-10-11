document.querySelector('form').addEventListener('submit', onRegister);

async function onRegister(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);

    const email = formData.get('email');
    const password = formData.get('password');

   const url = 'http://localhost:3030/users/login';

    const responce = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password})
    });

    if (responce.ok==false) {
        const err = await responce.json();
        return alert(err.message);
    }
    const res = await responce.json();
    console.log(res);
    sessionStorage.setItem('userToken',res.accessToken);
    window.location.pathname="/index.html"

}