import { html } from "../../node_modules/lit-html/lit-html.js"
import { searchByYear } from "../api/data.js"
import { createItem } from "../views/common/item.js"

const searchTemplate = (list, onsearch, year) => html`

<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year" .value=${year || ''}>
        <button @click=${onsearch} class="button-list">Search</button>
    </div>



    <h2>Results:</h2>
    <div class="listings">

        ${list.length > 0 ? list.map(createItem) : html`<p class="no-cars"> No results.</p>`}

    </div>

</section>
            
`;



export async function searchPage(ctx) {
    const year = Number(ctx.querystring.split("=")[1]);
    const cars = Number.isNaN(year) ? [] : await searchByYear(year);

    ctx.render(searchTemplate(cars, onClick, year));


    async function onClick() {
        const query = Number(document.getElementById('search-input').value);
        if(Number.isNaN(query)){
        ctx.page.redirect('/search?query=' + query);
        } else {
            alert('Year musr be positive naumber');
        }

    }
}