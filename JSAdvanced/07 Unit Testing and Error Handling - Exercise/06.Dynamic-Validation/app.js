function validate() {
    let email = document.getElementById('email');

    email.addEventListener('change', () => {
        const regex = /[a-z]+@[a-z]+\.[a-z]+/
        if (regex.test(email.value)) {
            email.className = '';
        } else {
            email.className = 'error';
        }
    })
}