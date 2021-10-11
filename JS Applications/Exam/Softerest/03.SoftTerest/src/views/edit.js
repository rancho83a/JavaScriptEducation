import { getItemById, editItem } from "../api/data.js"
import { html } from "../../node_modules/lit-html/lit-html.js"

const editTemplateExp = (item, onSubmit) => html`
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
                        <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value = ${item.imageUrl}>
                        <input type="submit" class="registerbtn button" value="Edit Meme">
                    </div>
                </form>
            </section>
`;

const editTemplate = (item, onSubmit) => html`

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
                        required="" autofocus="" .value=${item.title}>
                </div>
                <div class="form-label-group">
                    <label for="ideaDescription">Description</label>
                    <textarea type="text" name="description" class="form-control" placeholder="Description"
                        required="" .value=${item.description}></textarea>
                </div>
                <div class="form-label-group">
                    <label for="inputURL">Add Image</label>
                    <input type="text" id="imageURl" name="imageURL" class="form-control" placeholder="Image URL"
                        required="" .value=${item.img}>

                </div>
                <button class="btn btn-lg btn-dark btn-block" type="submit">Create</button>

                <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2021.</p>
            </form>
        </div>
    </div>

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
        const img = formData.get('imageURL').trim();

        if (!title || !description || !img) {
            return alert('All fields required');
        }   
        const data = {title,description, img}

        await editItem(id, data);
        ctx.page.redirect('/details/' + id);
    }
}