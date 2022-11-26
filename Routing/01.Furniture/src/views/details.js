import {html, nothing} from "../lib.js";
import {deleteById, getById} from "../api/data.js";


const template = (data, isOwner) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Furniture Details</h1>
        </div>
    </div>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src=.${data.img}/>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <p>Make: <span>${data.make}</span></p>
            <p>Model: <span>${data.model}</span></p>
            <p>Year: <span>${data.year}</span></p>
            <p>Description: <span>${data.description}</span></p>
            <p>Price: <span>${data.price}</span></p>
            <p>Material: <span>${data.material}</span></p>
            ${isOwner ? html`
                <div>
                    <a href=/edit/${data._id} class="btn btn-info">Edit</a>
                    <a href=”#” @click="${deleteItem}" class="btn btn-red">Delete</a>
                </div>` : nothing}
        </div>
    </div>`;

let ctx;

export async function detailsView(context) {
    ctx = context;
    const id = ctx.params.id;
    const data = await getById(id);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const isOwner = user._id === data._ownerId;
    ctx.render(template(data, isOwner));
}

async function deleteItem(evt) {
    evt.preventDefault();
    await deleteById(ctx.params.id);
    ctx.page.redirect('/catalog')
}