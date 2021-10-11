import { html } from "../../../node_modules/lit-html/lit-html.js"

export const createItem = (item) => html`
<article class="layout">
    <img src=${item.logoUrl} class="team-logo left-col">
    <div class="tm-preview">
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        <span class="details">${item.count} Members</span>
        <div><a href="/details/${item._id}" class="action">See details</a></div>
    </div>
</article>
`;
