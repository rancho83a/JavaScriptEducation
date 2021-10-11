import { html } from "../../node_modules/lit-html/lit-html.js"
import { searchByYear } from "../api/data.js"
import{createItem} from "../views/common/item.js"

const searchTemplate = (list, onsearch, isSearch) => html`

<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button @click=${onsearch} class="button-list">Search</button>
    </div>

    ${!isSearch ?  '' : html`

    <h2>Results:</h2>
    <div class="listings">

        ${list.length > 0 ? list.map(createItem) : html`<p class="no-cars"> No results.</p>`}

    </div>`}

</section>
            
`;



export async function searchPage(ctx) {

    ctx.render(searchTemplate([], onClick, false));

    async function onClick() {
        const query = document.getElementById('search-input').value;
        const list = await searchByYear(query);
        ctx.render(searchTemplate(list, onClick, true));

        console.log(list);
    }



}