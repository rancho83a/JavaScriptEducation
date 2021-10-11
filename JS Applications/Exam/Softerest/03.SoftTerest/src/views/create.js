
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

<div class="container home wrapper  my-md-5 pl-md-5">
        <div class=" d-md-flex flex-mb-equal ">
            <div class="col-md-6">
                <img class="responsive-ideas create" src="./images/creativity_painted_face.jpg" alt="">
            </div>
            <form @submit = ${onSubmit} class="form-idea col-md-5" action="#/create" method="post">
                <div class="text-center mb-4">
                    <h1 class="h3 mb-3 font-weight-normal">Share Your Idea</h1>
                </div>
                <div class="form-label-group">
                    <label for="ideaTitle">Title</label>
                    <input type="text" id="title" name="title" class="form-control" placeholder="What is your idea?"
                        required="" autofocus="">
                </div>
                <div class="form-label-group">
                    <label for="ideaDescription">Description</label>
                    <textarea type="text" name="description" class="form-control" placeholder="Description"
                        required=""></textarea>
                </div>
                <div class="form-label-group">
                    <label for="inputURL">Add Image</label>
                    <input type="text" id="imageURl" name="imageURL" class="form-control" placeholder="Image URL"
                        required="">

                </div>
                <button class="btn btn-lg btn-dark btn-block" type="submit">Create</button>

                <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2021.</p>
            </form>
        </div>
    </div>
`;
export async function createPage(ctx) {
     ctx.setColorActiveBtn('create');
    //console.log('edit Page', ctx.params.id);
    ctx.render(createTemplate(onsubmit));

    async function onsubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        // console.log([...formData.entries()].reduce((a, [k,v])=> Object.assign(a, {[k]: v})     ,{}));
        //   const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {}); 
        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const img = formData.get('imageURL').trim();

        if (!title || !description || !img) {
            return alert('All fields required');
        }

        ctx.render(createTemplate(onsubmit));

        // if (Object.entries(data).filter(([k, v]) => k != 'material').some(([k, v]) => v == "")) {
        //     return alert("Please fill all mandatory fields")
        // }
        //console.log(title, description, imageUrl )        
        const data = { title, description, img }
        await createItem(data);
        ctx.page.redirect('/catalog');
    }
}
