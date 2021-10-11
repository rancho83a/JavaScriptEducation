import { getItemById, editItem } from "../api/data.js"
import { html } from "../../node_modules/lit-html/lit-html.js"
import { notify } from "../notification.js";

const editTemplate = (item, onSubmit) => html`
<!-- Edit Meme Page ( Only for logged user and creator to this meme )-->
<section id="edit-meme">
    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${item.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter description" name="description" .value=${item.description}>

                        </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${item.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>

`;

export async function editPage(ctx) {
    // ctx.setColorActiveBtn();

    //console.log('edit Page', ctx.params.id);
    const id = ctx.params.id;
    const item = await getItemById(id);

    ctx.render(editTemplate(item, onsubmit));
    async function onsubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        // console.log([...formData.entries()].reduce((a, [k,v])=> Object.assign(a, {[k]: v})     ,{}));
        //   const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {}); 
        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const imageUrl = formData.get('imageUrl').trim();
        try {
            if (!title || !description || !imageUrl) {
               // return alert('All fields required');
               throw new Error('All fields required');

            }
            const data = { title, description, imageUrl }

            await editItem(id, data);
            ctx.page.redirect('/details/' + id);
        } catch (err) {
            notify(err.message)
        }
    }
}