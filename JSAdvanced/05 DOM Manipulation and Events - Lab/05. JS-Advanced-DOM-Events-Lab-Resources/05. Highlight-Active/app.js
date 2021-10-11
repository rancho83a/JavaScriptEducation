function focus() {

    let divs = document.querySelectorAll('input');

    for (div of divs) {
        div.addEventListener('focus', (ev) => {
            ev.target.parentNode.classList.add("focused");
        });
        div.addEventListener('blur', (ev) => {
            ev.target.parentNode.classList.remove("focused");
        });
    }
}