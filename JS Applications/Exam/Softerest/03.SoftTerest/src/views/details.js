import { getItemById, deleteItem } from "../api/data.js"
import { html } from "../../node_modules/lit-html/lit-html.js"
import { createModal } from "../modal.js";



const detailsTemplate = (item, ondelete, isOwner) => html`
   <div class="container home some">
        <img class="det-img" src="${item.img}" />
        <div class="desc">
            <h2 class="display-5">${item.title}</h2>
            <p class="infoType">Description:</p>
            <p class="idea-description">${item.description}</p>
        </div>
        ${isOwner ? html`
        <div class="text-center">
            <a @click=${ondelete} class="btn detb" href="javascript:void(0)">Delete</a>
            <a class="btn detb" href="/edit/${item._id}">Edit</a>

        </div>` : ''}
    </div>

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


    // async function ondelete() {
    //     const confirmed = confirm("Are you sure to delete item?");
    //     if (confirmed) {
    //         await deleteItem(id);
    //         ctx.page.redirect('/catalog');
    //     }
    // }
    async function ondelete() {
        const confirmed = await createModal("Are you sure to delete item?");
        if (confirmed) {
            await deleteItem(id);
            ctx.page.redirect('/catalog');
        }
    }
}