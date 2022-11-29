import {html, nothing} from "../lib.js";
import {getUserData} from "../utils.js";
import {apply, deleteById, getById, getOwnApplies, getTotalCount} from "../api/data.js";

const detailsTemplate = (offer, isOwner, hasUser, totalCount, hasApplied, onDelete, onApply) => html`
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${offer.imageUrl}" alt="example1"/>
            <p id="details-title">${offer.title}</p>
            <p id="details-category">
                Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-salary">
                Salary: <span id="salary-number">7000</span>
            </p>
            <div id="info-wrapper">
                <div id="details-description">
                    <h4>Description</h4>
                    <span
                    >${offer.description}</span
                    >
                </div>
                <div id="details-requirements">
                    <h4>Requirements</h4>
                    <span
                    >${offer.requirements}</span
                    >
                </div>
            </div>
            <p>Applications: <strong id="applications">${totalCount}</strong></p>
            <div id="action-buttons">
                ${isOwner
                        ? html`
                            <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
                            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
                        : nothing}
                ${hasUser && !isOwner && hasApplied === 0
                        ? html`<a @click=${onApply} href="javascript:void(0)" id="apply-btn">Apply</a>`
                        : nothing}
            </div>
        </div>
    </section>`;


export async function showDetails(ctx) {
    const id = ctx.params.id;
    const totalCount = await getTotalCount(id);
    const offer = await getById(id);
    const user = getUserData();
    const hasUser = Boolean(user);
    const isOwner = hasUser && user._id === offer._ownerId;

    let hasApplied = 0;
    if (hasUser && !isOwner) {
        hasApplied = await getOwnApplies(id, user._id);
    }

    ctx.render(detailsTemplate(offer, isOwner, hasUser, totalCount, hasApplied, onDelete, onApply));

    async function onDelete() {
        const choice = confirm('Are you sure you want do delete this album?');
        if (choice) {
            await deleteById(id);
            ctx.page.redirect('/dashboard');
        }
    }

    async function onApply() {
        await apply(id);
        ctx.page.redirect(`/dashboard/${id}`);
    }
}