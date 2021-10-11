import { showDetails } from './details.js';


async function getMovies() {
    const response = await fetch('http://localhost:3030/data/movies');
    const data = await response.json();
    return data;
}

function createMoviePreview(movie) {
    let div = document.createElement('div');
    div.className = 'card mb-4';

    div.innerHTML = `<img class="card-img-top" src="${movie.img}"
    alt="Card image cap" width="400">
<div class="card-body">
    <h4 class="card-title">${movie.title}</h4>
</div>
<div class="card-footer">
    <a href="#/details/CUtL9j4qI0XVhn9kTUsx">
        <button id = "${movie._id}" type="button" class="btn btn-info movieDetailsLink">Details</button>
    </a>
</div>` ; 
return div;
}


let main;
let section;
let container;

export function setupHome(targetMain, targetSection) {
    main = targetMain;
    section = targetSection;
    container = document.querySelector('.card-deck.d-flex.justify-content-center');
    container.addEventListener('click', (ev)=> {
        if(ev.target.classList.contains('movieDetailsLink')){
            showDetails(ev.target.id);
        }
    })
}

export async function showHome() {
    container.innerHTML = 'Loading...';
    main.innerHTML = '';
    main.appendChild(section);
   
    const data = await getMovies();
    const card = data.map(createMoviePreview);
    let fragment = document.createDocumentFragment();
    card.forEach(c => fragment.appendChild(c));

    container.innerHTML = '';
    container.appendChild(fragment);
}