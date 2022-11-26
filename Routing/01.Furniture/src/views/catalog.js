import {html} from '../lib.js';
import {getAllItems} from "../api/data.js";

const catalogTemplate = (data) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>
        </div>
    </div>
    <div class="row space-top">
        ${Object.values(data).map(i => createCard(i))}
    </div>`;

const createCard = (i) => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${i.img}/>
                <p>${i.description}</p>
                <footer>
                    <p>Price: <span>${i.price} $</span></p>
                </footer>
                <div>
                    <a href="/details/${i._id}" class="btn btn-info">Details</a>
                </div>
            </div>
        </div>`;

let ctx;

export async function catalogView(context) {
    ctx = context;
    const data = await getAllItems();
    ctx.render(catalogTemplate(data));
}