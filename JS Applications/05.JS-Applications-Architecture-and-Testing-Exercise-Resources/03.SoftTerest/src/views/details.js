import { getIdeaDetails, deleteIdea } from "../api/data.js";
import { e } from "../dom.js"
export function setupDetails(section, navigation) {

    return showDetails;

    async function showDetails(id) {
        section.innerHTML = "";
        const idea = await getIdeaDetails(id);
        const userId = sessionStorage.getItem('userId');
        section.innerHTML = getDetailsContent(idea, idea._ownerId == userId);
        console.log(section.querySelector('.detb'));
        const btn = section.querySelector('.detb');
        if (btn) {
            btn.addEventListener('click', async (ev) => {
                ev.preventDefault();
                const confirmed = confirm('Are you sure t delete idea?');
                if (confirmed) {
                    await deleteIdea(id);
                    navigation.goTo('dashboard');
                }
            });
        }
        return section;
    }
}



function getDetailsContent(idea, isOwner) {
    let content =
        `<img class="det-img" src="${idea.img}" />
    <div class="desc">
        <h2 class="display-5">${idea.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${idea.description}</p>
    </div>`

    if (isOwner) {
        content += ` <div class="text-center">
        <a class="btn detb" href="">Delete</a>
    </div>`;
    }
    return content;
}
/*

function renderIdeaDetails(idea) {

    //от HTML  се вижда че детайлите не са обградени в един елемент, затова правим фрагмент: NO аз ползвах иннерХТМЛ за тази задача
    const fragment = document.createDocumentFragment();
    fragment.innerHTML = "";

    return fragment;
}
*/