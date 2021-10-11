import { render } from "./node_modules/lit-html/lit-html.js";
import { contacts } from "./contacts.js";
import cardTemplate from "./cardDeligation.js"


contacts.forEach(c => c.isVisible = false);
const container = document.getElementById('contacts');


render(contacts.map(cardTemplate), container);
container.addEventListener('click', onclick);


function onclick(ev) {
    if (ev.target.classList.contains("detailsBtn")) {
        const id = ev.target.parentNode.querySelector('div .details').id;
        const element = contacts.find(c => c.id == id);
        element.isVisible = !element.isVisible;//togle
        render(contacts.map(cardTemplate), container);
    }
}