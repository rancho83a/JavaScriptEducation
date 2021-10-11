import { getMovieById, showDetails } from "./details.js";

let main;
let section;

export function setupEdit(targetMain, targetSection) {
    main = targetMain;
    section = targetSection;
    const form = section.querySelector('form');
    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const formData = new FormData(form);
        onSubmit([...formData.entries()].reduce((data, [k, v]) => (Object.assign(data, { [k]: v })), {}));
    })
}

async function onSubmit(data) {

    if (data.title == '' || data.img == '' || data.description == '') {
        return alert('All fileds required')
    }
    const movieId = data.id;
    try {
        const response = await fetch("http://localhost:3030/data/movies/" + movieId, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('userToken')
            },
            body: JSON.stringify({
                title: data.title,
                description: data.description,
                img: data.imageUrl
            })
        });

        if (response.ok) {
            const movie = await response.json();
            showDetails(movie._id);
        }
    } catch (err) {
        console.error(err.message);
        alert(err.message);
    }
}

export async function showEdit(id) {
    main.innerHTML = "";
    main.appendChild(section);

    const movie = await getMovieById(id);
    console.log(movie);

    section.querySelector('[name="title"]').value = movie.title;
    section.querySelector('[name="description"]').value = movie.description;
    section.querySelector('[name="imageUrl"]').value = movie.img;
    section.querySelector('[name="id"]').value = movie._id;

}