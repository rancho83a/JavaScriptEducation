
import { createItem } from "../api/data.js"
import { html } from "../../node_modules/lit-html/lit-html.js"

const createTemplateExp = (onSubmit) => html`

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

const createTemplate = (onSubmit) => html` 
<!-- Create -->
<section id="create-page" class="content">
    <h1>Create Article</h1>

    <form @submit=${onSubmit}id="create" action="#" method="">
        <fieldset>
            <p class="field title">
                <label for="create-title">Title:</label>
                <input type="text" id="create-title" name="title" placeholder="Enter article title">
            </p>

            <p class="field category">
                <label for="create-category">Category:</label>
                <input type="text" id="create-category" name="category" placeholder="Enter article category">
            </p>
            <p class="field">
                <label for="create-content">Content:</label>
                <textarea name="content" id="create-content"></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Create">
            </p>

        </fieldset>
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
        const category = formData.get('category').trim();
        const content = formData.get('content').trim();

        if (!title || !category || !content) {
            return alert('All fields required');
        }
        const categories = ["JavaScript", "C#", "Java", "Python"];

        if (!categories.includes(category)) {
            return alert('The category must be one of "JavaScript", "C#", "Java" or "Python"');
        }

        ctx.render(createTemplate(onsubmit));

        // if (Object.entries(data).filter(([k, v]) => k != 'material').some(([k, v]) => v == "")) {
        //     return alert("Please fill all mandatory fields")
        // }
        //console.log(title, description, imageUrl )        
        const data = { title, category, content }
        await createItem(data);
        ctx.page.redirect('/home');
    }
}
