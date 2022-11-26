import {html} from '../lib.js'
import {updateById, getById, createItem} from "../api/data.js";
import {validateData} from "./validator.js";

const template = (data, input) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Edit Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control ${input.make}" id="new-make" type="text" name="make" value=${data.make}>
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control is-valid ${input.model}" id="new-model" type="text" name="model"
                           value=${data.model}>
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control is-invalid ${input.year}" id="new-year" type="number" name="year"
                           value=${data.year}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control ${input.description}" id="new-description" type="text" name="description"
                           value=${data.description}>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control ${input.price}" id="new-price" type="number" name="price"
                           value=${data.price}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control ${input.img}" id="new-image" type="text" name="img" value=${data.img}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text"  name="material" value=${data.material}>
                </div>
                <input type="submit" class="btn btn-info" value="Edit"/>
            </div>
        </div>
    </form>`;

let ctx;

export async function editView(context) {
    ctx = context;
    const id = ctx.params.id;
    const data = await getById(id);
    ctx.render(template(data, {}))
}

async function onSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData);
    const valid = validateData(data);
    const isValid = Object.values(valid).filter(i => i === 'is-invalid');

    if (isValid.length === 0) {
        await createItem(data);
        evt.target.reset();
        ctx.page.redirect('/catalog');
    } else {
        ctx.render(template(formData, valid));

    }
}