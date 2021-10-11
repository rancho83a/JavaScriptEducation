import { showEdit } from "./edit.js";
import { showHome } from "./home.js";

let main;
let section;
let likes;
export function setupDetails(targetMain, targetSection) {
    main = targetMain;
    section = targetSection;

}
const actionBtn = {
    'btn-primary': likesFilm,
    'btn-warning': editMovie,
    'btn-danger': deleteMovie
}
async function likesFilm(ev, id) {
    const response = await fetch("http://localhost:3030/data/likes", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('userToken')
        },
        body: JSON.stringify({ movieId: id })
    });
    if (response.ok) {
        const like = await response.json();
        ev.target.remove();
        likes++;
        document.getElementById('spanLike').innerHTML = `<span id="spanLike" class="enrolled-span">${likes} like${likes == 1 ? '' : 's'}</span>`;
    }
}
async function deleteMovie(ev, id) {
    ev.preventDefault();
    const confirmed = confirm("Are you sure to delete this movie?");
    if (confirmed) {
        const response = await fetch("http://localhost:3030/data/movies/" + id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('userToken')
            },
        });
        if (response.ok) {
            alert('Movie deleted');
            showHome();
        } else {
            const err = await response.json();
            alert(err.message);
        }
    }
}
function editMovie(ev, id) {
    ev.preventDefault();
    showEdit(id);
}

async function getLikesByMovie(id) {
    const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&amp;distinct=_ownerId&amp;count`);
    const data = await response.json();
    return data;
}

async function getOwnLikesByMovie(id) {
    const userId = sessionStorage.getItem('userId')
    const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22`);
    const data = await response.json();
    return data;
}
export async function showDetails(id) {
    section.innerHTML = "Loading...";
    main.innerHTML = "";
    main.appendChild(section);
    const [movie, likesMovie, ownlike] = await Promise.all([
        getMovieById(id),
        getLikesByMovie(id),
        getOwnLikesByMovie(id)
    ]);
    likes = likesMovie.length;

    const card = createCard(movie, likes, ownlike.length);
    section.innerHTML = "";
    section.appendChild(card);

    document.querySelector('.col-md-4').addEventListener('click', (ev) => {
        const action = actionBtn[ev.target.classList[1]];
        if (typeof action == 'function') {
            action(ev, id);
        }
    });
}

export async function getMovieById(id) {
    const response = await fetch("http://localhost:3030/data/movies/" + id);
    const movie = await response.json();
    return movie;
}

function createCard(movie, likes, ownlike) {
    const userId = sessionStorage.getItem('userId');
    let controls = [];
    if (userId != null) {
        if (userId == movie._ownerId) {
            controls.push('<a class="btn btn-danger" href="#">Delete</a>');
            controls.push('<a class="btn btn-warning" href="#">Edit</a>');
        } else if (ownlike == 0) {
            controls.push('<a class="btn btn-primary" href="#">Like</a>')
        }
    }
    controls.push(`<span id="spanLike" class="enrolled-span">${likes} like${likes == 1 ? '' : 's'}</span>`);

    const div = document.createElement('div');
    div.className = "container";
    div.innerHTML =
        `<div class="row bg-light text-dark">
        <h1>Movie title: ${movie.title}</h1>
 
        <div class="col-md-8">
            <img class="img-thumbnail"
                src="${movie.img}" alt="Movie">
        </div>
        <div id = "btnDetails" class="col-md-4 text-center">
            <h3 class="my-3 ">Movie Description</h3>
            <p>${movie.description}</p>
            ${controls.join('')}
        </div>
    </div>`;
    return div;
}