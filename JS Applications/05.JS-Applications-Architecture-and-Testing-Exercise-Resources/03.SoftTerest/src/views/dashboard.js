import { getIdeas } from "../api/data.js"
import { e } from "../dom.js"


export function setupDashboard(section, navigation) {
    section.addEventListener('click', (ev) => {
        ev.preventDefault();
        if (ev.target.classList.contains('btn')) {
            const id = ev.target.id;
            navigation.goTo('details', id);
        }

    })

    return showDashboard;

    async function showDashboard() {

        const ideas = await getIdeas();
        section.innerHTML = "";
        if (ideas.length == 0) {
            section.innerHTML = `<h1>No ideas yet! Be the first one :)</h1>`;
        } else {
            const card = ideas.map(createIdeaPreview);
            card.forEach(c => section.appendChild(c));
        }
        return section;
    }
}

function createIdeaPreview(idea) {
    const div = e('div', { className: 'card overflow-hidden current-card details' });
    div.style.width = '20rem';
    div.style.height = '18rem';

    div.innerHTML = `<div class="card-body">
 <p class="card-text">${idea.title}</p>
 </div>
 <img class="card-image" src="${idea.img}" alt="Card image cap">
 <a id="${idea._id}"class="btn" href="">Details</a>`;
    return div;
}
