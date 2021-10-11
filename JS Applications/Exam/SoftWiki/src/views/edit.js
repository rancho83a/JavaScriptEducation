import { getItemById, editItem } from "../api/data.js"
import { html } from "../../node_modules/lit-html/lit-html.js"


const editTemplate = (item, onSubmit) => html`
 <!-- Edit -->
 <section id="edit-page" class="content">
            <h1>Edit Article</h1>

            <form @submit=${onSubmit} id="edit" action="#" method="">
                <fieldset>
                    <p class="field title">
                        <label for="title">Title:</label>
                        <input type="text" name="title" id="title" placeholder="Enter article title" .value=${item.title}>
                    </p>

                    <p class="field category">
                        <label for="category">Category:</label>
                        <input type="text" name="category" id="category" placeholder="Enter article category" .value=${item.category}>
                    </p>
                    <p class="field">
                        <label for="content">Content:</label>
                        <textarea name="content" id="content" .value=${item.content}></textarea>
                    </p>

                    <p class="field submit">
                        <input class="btn submit" type="submit" value="Save Changes">
                    </p>

                </fieldset>
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
        const category = formData.get('category').trim();
        const content = formData.get('content').trim();

        if (!title || !category || !content) {
            return alert('All fields required');
        }
        const categories = ["JavaScript", "C#", "Java", "Python"];

        if (!categories.includes(category)) {
            return alert('The category must be one of "JavaScript", "C#", "Java" or "Python"');
        }
 
        const data = { title, category, content }

        await editItem(id, data);
        ctx.page.redirect('/details/' + id);
    }
}