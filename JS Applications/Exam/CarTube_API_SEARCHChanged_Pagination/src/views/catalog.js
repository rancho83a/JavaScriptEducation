import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllItems, getCollectionSize } from "../api/data.js"
import { createItem } from "../views/common/item.js"


// const createItem = (item) => html`
// <div class="listing">
//     <div class="preview">
//         <img src=${item.imageUrl}>
//     </div>
//     <h2>${item.brand} ${item.model}</h2>
//     <div class="info">
//         <div class="data-info">
//             <h3>Year: ${item.year}</h3>
//             <h3>Price: ${item.price} $</h3>
//         </div>
//         <div class="data-buttons">
//             <a href="/details/${item._id}" class="button-carDetails">Details</a>
//         </div>
//     </div>
// </div>
// `;
const catalogTemplate = (list, page, pages) => html`
<!-- All Listings Page -->
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">

        <div>
            Page ${page} / ${pages}
           ${page>1 ? html`<a class="button-list" href="/catalog?page=${page-1}">&lt; Prev</a>` : ''}
            ${page< pages ? html`<a class="button-list" href="/catalog?page=${page+1}">Next &gt;</a>` : ''}
        </div>

        ${list.length > 0 ? list.map(createItem) : html` <p class="no-cars">No cars in database.</p>`}
    </div>
</section>
`;

//    ${list.length>0 ? list.map(createItem) : html`  <p class="no-cars">No cars in database.</p>`

export async function catalogPage(ctx) {
    //ctx.setColorActiveBtn('catalogLink');

    const page = Number(ctx.querystring.split('=')[1] || 1);



    const count = await getCollectionSize();
    const pages = Math.ceil(count / 3);
    const list = await getAllItems(page);
    ctx.render(catalogTemplate(list, page, pages));
}