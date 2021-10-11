import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllItems } from "../api/data.js"
import { createTemplateItem } from "../views/common/item.js"
import {until} from "../../node_modules/lit-html/directives/until.js"


const dashboardTemplate = (list, search, onSerach) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
        <div style="float:right">
            <input id="searchInput" name="search" type="text" .value=${search}>
            <button @click=${onSerach}>Search</button>
        </div>
    </div>
</div>
<div class="row space-top">
    ${list.map(createTemplateItem)};
</div>
`;
const placeholder = html`<p>Loading&hellip;</p>`;

export async function dashboardPage(ctx) {
    ctx.setColorActiveBtn('catalogLink');
    const searchParam = ctx.querystring.split('=')[1] || "" ;
  
    ctx.render(until(populateTemplate(), placeholder));
  
    function onSerach() {
        const search = encodeURIComponent(document.getElementById("searchInput").value);
        ctx.page.redirect('/?search=' + search)
    }
    async function populateTemplate(){
        const list = await getAllItems(searchParam);

        return dashboardTemplate(list, searchParam, onSerach)
    }
}