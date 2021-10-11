
import { createItem } from "../api/data.js"
import { html } from "../../node_modules/lit-html/lit-html.js"

const createTemplate = (onSubmit) => html`

            <!-- Create Meme Page ( Only for logged users ) -->
            <section id="create-meme">
                <form @submit=${onSubmit} id="create-form">
                    <div class="container">
                        <h1>Create Meme</h1>
                        <label for="title">Title</label>
                        <input id="title" type="text" placeholder="Enter Title" name="title">
                        <label for="description">Description</label>
                        <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                        <label for="imageUrl">Meme Image</label>
                        <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                        <input type="submit" class="registerbtn button" value="Create Meme">
                    </div>
                </form>
            </section>
`;
export async function createPage(ctx) {
    //console.log('edit Page', ctx.params.id);
    ctx.render(createTemplate(onsubmit));
   // ctx.setColorActiveBtn('createLink');

    async function onsubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        // console.log([...formData.entries()].reduce((a, [k,v])=> Object.assign(a, {[k]: v})     ,{}));
        //   const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {}); 
        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const imageUrl = formData.get('imageUrl').trim();

        if (!title || !description || !imageUrl) {
            return alert('All fields required');
        }

        ctx.render(createTemplate(onsubmit));

        // if (Object.entries(data).filter(([k, v]) => k != 'material').some(([k, v]) => v == "")) {
        //     return alert("Please fill all mandatory fields")
        // }
        //console.log(title, description, imageUrl )        
        const data = { title, description, imageUrl }
        await createItem(data);
        ctx.page.redirect('/catalog');
    }
}
