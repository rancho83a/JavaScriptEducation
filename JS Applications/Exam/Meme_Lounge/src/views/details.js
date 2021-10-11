import { getItemById, deleteItem } from "../api/data.js"
import { html } from "../../node_modules/lit-html/lit-html.js"

const detailsTemplate = (item, ondelete, isOwner) => html`
<!-- Details Meme Page (for guests and logged users) -->
<section id="meme-details">
    <h1>Meme Title: ${item.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${item.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${item.description}
            </p>

            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            ${isOwner ? html`
            <a class="button warning" href="/edit/${item._id}">Edit</a>
            <button @click=${ondelete} class="button danger">Delete</button> ` : ''}
        </div>
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