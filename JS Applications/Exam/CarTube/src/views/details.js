import { getItemById, deleteItem } from "../api/data.js"
import { html } from "../../node_modules/lit-html/lit-html.js"

const detailsTemplate = (item, ondelete, isOwner) => html`

<section id="listing-details">
            <h1>Details</h1>
            <div class="details-info">
                <img src=${item.imageUrl}>
                <hr>
                <ul class="listing-props">
                    <li><span>Brand:</span>${item.brand}</li>
                    <li><span>Model:</span>${item.model}</li>
                    <li><span>Year:</span>${item.year}</li>
                    <li><span>Price:</span>${item.price}$</li>
                </ul>

                <p class="description-para">${item.description}</p>
                ${isOwner ? html`
                <div class="listings-buttons">
                    <a href="/edit/${item._id}" class="button-list">Edit</a>
                    <a @click=${ondelete} href="javascript:void(0)" class="button-list">Delete</a>
                </div>` : ''}
            </div>
        </section>  
`;

/*
 ${isOwner ? html`
        <div>
            <a href='/edit/${item._id}' class="btn btn-info">Edit</a>
            <a @click=${ondelete} href="javascript:void(0)" class="btn btn-red">Delete</a>
        </div>` : ''}

*/

export async function detailsPage(ctx) {
    //ctx.setColorActiveBtn('det');

    //  console.log('details Page', ctx.params.id);
    const id = ctx.params.id
    const item = await getItemById(id);
    ctx.render(detailsTemplate(item, ondelete, sessionStorage.getItem('userId') == item._ownerId));


    async function ondelete() {
        const confirmed = confirm("Are you sure to delete item?");
        if (confirmed) {
            await deleteItem(id);
            ctx.page.redirect('/catalog');
        }
    }
}