import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllItems, getCollectionSize } from "../api/data.js"
import { until } from "../../node_modules/lit-html/directives/until.js"
import { loaderTemplate } from "./common/loader.js"


const createItem = (item) =>
    html`
<div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
    <div class="card-body">
        <p class="card-text">${item.title}</p>
    </div>
    <img class="card-image" src="${item.img}" alt="Card image cap">
    <a class="btn" href="/details/${item._id}">Details</a>
</div>

`;
//const catalogTemplate = (list) => html`
const catalogTemplate = (list,page,pages) => html`
 <div>
        Page ${page} / ${pages}
        ${page > 1 ? html`<a class="button-list" href="/catalog?page=${page - 1}">&lt; Prev</a>` : ''}
        ${page < pages ? html`<a class="button-list" href="/catalog?page=${page + 1}">Next &gt;</a>` : ''}
    </div>

<div id="dashboard-holder">

   


    ${list.length > 0 ? list.map(createItem) : html`
</div>
<h1>No ideas yet! Be the first one :)</h1>
</div>`}
`;


// export async function catalogPage(ctx) {
//     ctx.setColorActiveBtn('catalog');

//     //если сервер медленний -то можно     ctx.render(<p>Loading...) || lit-html have specific function - next lecture;
//     //console.log('dashboard Page');

//     const list = await getAllItems();
//     //console.log(list);
//     ctx.render(catalogTemplate(list));
// }

// export async function catalogPage(ctx) {
//     ctx.setColorActiveBtn('catalog');
//     ctx.render(until(populateTemplate(), loaderTemplate()));

//     async function populateTemplate() {
//         const list = await getAllItems();
//         return catalogTemplate(list);
//     }
// }

export async function catalogPage(ctx) {
    //ctx.setColorActiveBtn('catalogLink');
    ctx.render(until(populateTemplate(), loaderTemplate()));


    async function populateTemplate() {


        const page = Number(ctx.querystring.split('=')[1] || 1);
        const count = await getCollectionSize();
        console.log(count);
        const pages = Math.ceil(count / 2);
        const list = await getAllItems(page);
        return catalogTemplate(list, page, pages);
    }
}
