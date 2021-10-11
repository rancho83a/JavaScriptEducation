
import { createItem } from "../api/data.js"
import { html } from "../../node_modules/lit-html/lit-html.js"

const createTemplate = (onSubmit) => html`

        <!-- Create Listing Page -->
        <section id="create-listing">
            <div class="container">
                <form @submit=${onSubmit} id="create-form">
                    <h1>Create Car Listing</h1>
                    <p>Please fill in this form to create an listing.</p>
                    <hr>
        
                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand">
        
                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model">
        
                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description">
        
                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year">
        
                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl">
        
                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price">
        
                    <hr>
                    <input type="submit" class="registerbtn" value="Create Listing">
                </form>
            </div>
        </section>
`;
export async function createPage(ctx) {
    //console.log('edit Page', ctx.params.id);
    ctx.render(createTemplate(onsubmit));
    // ctx.setColorActiveBtn('createLink');

    async function onsubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        //console.log([...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {}));
        const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});
        // const title = formData.get('title').trim();
        // const description = formData.get('description').trim();
        // const imageUrl = formData.get('imageUrl').trim();

        // if (!title || !description || !imageUrl) {
        //     return alert('All fields required');
        // }

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
        // ctx.render(createTemplate(onsubmit));

        // const data = {
        //     brand,
        //     model,
        //     description,
        //     year,
        //     imageUrl,
        //     price
        // }
        await createItem(data);
        ctx.page.redirect('/catalog');
    }
}
