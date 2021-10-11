function validate() {
    let email = document.querySelector('#email');
    email.addEventListener('change', onchange);



    function onchange(ev) {
        if (/[a-z]+@[a-z]+\.[a-z]+/.test(email.value)) {
            ev.target.className = "";
        } else {
            ev.target.className = 'error';
        }
    }
}