
import { createItem } from "../api/data.js"
import { html } from "../../node_modules/lit-html/lit-html.js"
import { clear, notify } from "../../src/notification.js"

const createTemplate = (onsubmit, errMsg) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onsubmit}>
    ${errMsg ? html`<p style="color:red">${errMsg.split('=').join('\n')}</p>` : ""}

    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class='form-control' id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control" id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control" id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>

`;

export async function createPage(ctx) {
    //console.log('edit Page', ctx.params.id);

    ctx.render(createTemplate(onsubmit));
    ctx.setColorActiveBtn('createLink');

    async function onsubmit(ev) {
        let errorList = [];
        ev.preventDefault();
        [...ev.target.querySelectorAll('input')].forEach(i => i.disabled = true);

        const makeInput = document.getElementById('new-make');
        const make = makeInput.value.trim();

        if (make && make.length >= 4) {
            makeInput.className = 'form-control is-valid';
        } else {
            makeInput.className = 'form-control is-invalid';
            errorList.push("Make field must be at least 4 symbols long")
        }

        const modelInput = document.getElementById('new-model');
        const model = modelInput.value.trim();

        if (model && model.length >= 4) {
            modelInput.className = 'form-control is-valid';
        } else {
            modelInput.className = 'form-control  is-invalid';
            errorList.push("Model field must be at least 4 symbols long")
        }


        const yearInput = document.getElementById('new-year');
        const year = Number(yearInput.value.trim());

        if (year && year >= 1950 && year <= 2050) {
            yearInput.className = 'form-control is-valid';
        } else {
            yearInput.className = 'form-control is-invalid';
            errorList.push("Year must be between 1950 and 2050")
        }

        const descInput = document.getElementById('new-description');
        const description = descInput.value.trim();

        if (description && description.length > 10) {
            descInput.className = 'form-control is-valid';
        } else {
            descInput.className = 'form-control is-invalid';
            errorList.push("Description must be more than 10 symbols")
        }

        const priceInput = document.getElementById('new-price');
        const price = Number(priceInput.value.trim());

        if (price && price > 0) {
            priceInput.className = 'form-control is-valid';
        } else {
            priceInput.className = 'form-control is-invalid';
            errorList.push("Price must be a positive number")
        }

        const imgInput = document.getElementById('new-image');
        const img = imgInput.value.trim();

        if (img) {
            imgInput.className = 'form-control is-valid';
        } else {
            imgInput.className = 'form-control is-invalid';
            errorList.push("Image URL is required")
        }

        if (errorList.length > 0) {
            //  return notify(errorList.join('\n'));
            // console.log(errorList.join('\n'));
            [...ev.target.querySelectorAll('input')].forEach(i => i.disabled = false);

            return ctx.render(createTemplate(onsubmit, errorList.join('=')))
            
        }
        const material = document.getElementById('new-material').value.trim();

        // ctx.render(createTemplate(onsubmit, onChange));

        // if (Object.entries(data).filter(([k, v]) => k != 'material').some(([k, v]) => v == "")) {
        //     return alert("Please fill all mandatory fields")
        // }

        const data = { make, model, year, description, price, img, material }
        try {
            await createItem(data);
            clear();
            ctx.page.redirect('/');
        } catch (err) {
            console.log(err.mesage)
        } finally {
            [...ev.target.querySelectorAll('input')].forEach(i => i.disabled = false);

        }
    }
}
