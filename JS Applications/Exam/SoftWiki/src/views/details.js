import { getItemById, deleteItem } from "../api/data.js"
import { html } from "../../node_modules/lit-html/lit-html.js"



const detailsTemplate = (item, ondelete, isOwner) => html`
<!-- Details -->
<section id="details-page" class="content details">
            <h1>${item.title}</h1>

            <div class="details-content">
                <strong>Published in category ${item.category}</strong>
                <p>${item.content}</p>

                <div class="buttons">
                ${isOwner ? html`
                    <a @click=${ondelete} href="javascript:void(0)" class="btn delete">Delete</a>
                    <a href="/edit/${item._id}" class="btn edit">Edit</a>
                    `: ''}
                    <a href="/home" class="btn edit">Back</a>
                </div>
            </div>
        </section>

`;


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
            ctx.page.redirect('/home');
        }
    }
}