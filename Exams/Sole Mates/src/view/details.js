import {html, nothing} from "../lib.js";
import {deleteById, getById} from "../api/data.js";
import {getUserData} from "../utils.js";

const detailsTemplate = (item, isOwner, onDelete) => html`
    <section id="details">
        <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
                <img src="${item.image}" alt="example1"/>
            </div>
            <div id="info-wrapper">
                <p>Brand: <span id="details-brand">${item.brand}</span></p>
                <p>
                    Model: <span id="details-model">${item.model}</span>
                </p>
                <p>Release date: <span id="details-release">${item.release}</span></p>
                <p>Designer: <span id="details-designer">${item.designer}</span></p>
                <p>Value: <span id="details-value">${item.value}</span></p>
            </div>
            ${isOwner ? html`
                <div id="action-buttons">
                    <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                    <a @click="${onDelete}" href="javascript:void(0)" id="delete-btn">Delete</a>
                </div>` : nothing}
        </div>
    </section>`;

export async function showDetails(ctx) {
    const id = ctx.params.id;
    const item = await getById(id);
    const user = getUserData();
    const isOwner = user._id === item._ownerId;
    ctx.render(detailsTemplate(item, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure you want do delete this album?');
        if (choice) {
            await deleteById(id);
            ctx.page.redirect('/catalog')
        }
    }
}