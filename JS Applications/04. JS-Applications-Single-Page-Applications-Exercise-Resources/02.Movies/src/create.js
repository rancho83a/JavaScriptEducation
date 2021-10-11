import { showDetails } from "./details.js"
import { showHome } from "./home.js";

async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const info = {
        title: formData.get('title'),
        description: formData.get('description'),
        img: formData.get('imageUrl'),
    }

    if (info.title == '' || info.img == '' || info.description == '') {
       return alert('All fileds required')
    }

    const response = await fetch('http://localhost:3030/data/movies', {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('userToken')
        },
        body: JSON.stringify(info)
    });

    if (response.ok) {
        const movie = await response.json();
       // showDetails(movie._id);
        showHome();
    } else {
        const err = await response.json();
        alert(err.message);
    }


}
let main;
let section;

export function setupCreate(targetMain, targetSection) {
    main = targetMain;
    section = targetSection;
    section.querySelector('form').addEventListener('submit', onSubmit);

}

export function showCreate() {

    main.innerHTML = "";
    main.appendChild(section);

}