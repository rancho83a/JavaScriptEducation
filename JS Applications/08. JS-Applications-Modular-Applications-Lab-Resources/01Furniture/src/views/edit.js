import { getItemById, editItem } from "../api/data.js"
import { html } from "../../node_modules/lit-html/lit-html.js"

const editTemplate = (item, onsubmit) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onsubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control" id="new-make" type="text" name="make" .value=${item.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control" id="new-model" type="text" name="model" .value=${item.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control " id="new-year" type="number" name="year" .value=${item.year}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description"
                    value=${item.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price" .value=${item.price}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img" .value=${item.img}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" .value=${item.material}>
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>
`;

export async function editPage(ctx) {
    ctx.setColorActiveBtn();

    //console.log('edit Page', ctx.params.id);
    const id = ctx.params.id;
    const item = await getItemById(id);

    ctx.render(editTemplate(item, onsubmit));


    async function onsubmit(ev) {
        ev.preventDefault();
        // const formData = new FormData(ev.target);
        // // console.log([...formData.entries()].reduce((a, [k,v])=> Object.assign(a, {[k]: v})     ,{}));
        // const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});

        // if (Object.entries(data).filter(([k, v]) => k != 'material').some(([k, v]) => v == "")) {
        //     return alert("Please fill all mandatory fields")
        // } 
        let errorList = [];

        const makeInput = document.getElementById('new-make');
        const make = makeInput.value.trim();

        if (make && make.length >= 4) {
            makeInput.className = 'form-control is-valid';
        } else {
            makeInput.className = 'form-control is-invalid';
            errorList.push("Make field must be at least 4 symbols long");
        }

        const modelInput = document.getElementById('new-model');
        const model = modelInput.value.trim();

        if (model && model.length >= 4) {
            modelInput.className = 'form-control is-valid';
        } else {
            modelInput.className = 'form-control  is-invalid';
            errorList.push("Model field must be at least 4 symbols long");
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
            return alert(errorList.join('\n'));
        }
        const material = document.getElementById('new-material').value.trim();

        const data = { make, model, year, description, price, img, material }

        await editItem(id, data);
        ctx.page.redirect('/details/' + id);


    }
}