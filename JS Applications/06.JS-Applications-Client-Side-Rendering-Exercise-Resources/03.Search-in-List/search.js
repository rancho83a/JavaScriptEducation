import { html, render } from "../node_modules/lit-html/lit-html.js"
import { towns } from "./towns.js"



const searchTemplate = (towns, match) => html`
  <article>
    <div id="towns">
      <ul>
        ${towns.map(t => townTemplate(t, match))}
      </ul>
    </div>
    <input type="text" id="searchText" .value="${match}" />
    <button @click=${search}>Search</button>
    <div id="result"> ${foundMatches(towns, match)}</div>
  </article>
  `;

const townTemplate = (name, match) => html`
  <li class=${(name.toLowerCase().includes(match.toLowerCase()) && match) ? "active" : "" }>${name}</li>
  `;

update();

function update(match = "") {
  const body = document.body
  render(searchTemplate(towns, match), body);
}

function search(ev) {
  const match = ev.target.parentNode.querySelector('input').value;
  update(match);

}

function foundMatches(towns, match) {

  const matches = towns.filter(t => t.toLowerCase().includes(match.toLowerCase()) && match).length;
  if (matches) {
    return matches + " matches found";
  }
  return '';

}
