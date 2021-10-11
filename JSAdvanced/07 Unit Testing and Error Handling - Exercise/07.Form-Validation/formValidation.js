function validate() {
    const submitBtn = document.getElementById('submit');
    const userName = document.getElementById('username');
    const email = document.getElementById('email');
    const pas = document.getElementById('password');
    const coPas = document.getElementById('confirm-password');
    const coNumber = document.getElementById('companyNumber');
    const checkBox = document.getElementById('company');
    const companyInfo = document.getElementById('companyInfo');
    const divValid = document.getElementById('valid');
    const regexUserName = /^([A-Za-z0-9]){3,20}$/gm;
    const regexEmail = /^(.+@(.+)?\.(.+)?)$/gm;
    const regexPas = /^(\w{5,15})$/gm;

    checkBox.addEventListener('change', () => {
        if (checkBox.checked) {
            companyInfo.style.display = "";
        } else {
            companyInfo.style.display = 'none';
        }
    })

    submitBtn.addEventListener('click', onclick);
    let isUserNameTrue;
    let isEmailTrue;
    let isPasTrue;
    let isCoPasTrue;
    let isCoNumberTrue = true;

    function onclick(ev) {
        ev.preventDefault()

        isUserNameTrue = checkField(regexUserName, userName);
        isEmailTrue = checkField(regexEmail, email);
        isPasTrue = checkField(regexPas, pas); 

        if (pas.value === coPas.value && coPas.value && isPasTrue) {
            coPas.style.border = "none";
            isCoPasTrue = true;
        } else {
            coPas.style.border = "";
            coPas.style.borderColor = "red";
            pas.style.border = "";
            pas.style.borderColor = "red";
            isCoPasTrue = false;
        }

        if (checkBox.checked) {
            let num = Number(coNumber.value);

            if (num >= 1000 && num <= 9999) {
                coNumber.style.border = "none";
            } else {
                coNumber.style.border = "";
                coNumber.style.borderColor = "red";
                isCoNumberTrue = false;
            }
        }

        if (isUserNameTrue && isEmailTrue && isPasTrue && isCoPasTrue && isCoNumberTrue) {
            divValid.style.display = "";
        } else {
            divValid.style.display = "none";
        }

    }

    function checkField(regex, element) {
        if (element.value.match(regex)) {
            element.style.border = "none";
            return true;
        } else {
            element.style.border = "";
            element.style.borderColor = "red";
            return false;
        }
    }
}
