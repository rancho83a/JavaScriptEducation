import { getItemById, editItem } from "../api/data.js"
import { html } from "../../node_modules/lit-html/lit-html.js"

const editTemplate = (item, onSubmit) => html`
<!-- Edit Listing Page -->
<section id="edit-listing">
            <div class="container">

                <form @submit=${onSubmit}id="edit-form">
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" .value=${item.brand}>

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" .value=${item.model}>

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" .value=${item.description}>

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" .value=${item.year}>

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${item.imageUrl}>

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" .value=${item.price}>

                    <hr>
                    <input type="submit" class="registerbtn" value="Edit Listing">
                </form>
            </div>
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
          const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {}); 
        // const title = formData.get('title').trim();
        // const description = formData.get('description').trim();
        // const imageUrl = formData.get('imageUrl').trim();

        // if (!title || !description || !imageUrl) {
        //     return alert('All fields required');
        // }   
        // const data = {title,description, imageUrl}
        if (Object.entries(data).filter(([k, v]) => k != 'material').some(([k, v]) => v == "")) {
            return alert("Please fill all mandatory fields")
        }
        //console.log(data.price);
        data.price = Number(data.price);
        data.year = Number(data.year);
        //console.log(data.price)

        if (data.price <= 0 || data.year <= 0) {
            return alert("Price and year must be positive numbers")

        }

        await editItem(id, data);
        ctx.page.redirect('/details/' + id);
    }
}