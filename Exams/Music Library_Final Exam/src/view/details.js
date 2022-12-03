import {html, nothing} from "../lib.js";
import {deleteById, getById, getOwnLikes, getTotalCount, like} from "../api/data.js";
import {getUserData} from "../utils.js";

const detailsTemplate = (album, isOwner, hasUser, totalCount, hasLiked, onDelete, onLike) => html`
    <section id="details">
        <div id="details-wrapper">
            <p id="details-title">Album Details</p>
            <div id="img-wrapper">
                <img src="${album.imageUrl}" alt="example1"/>
            </div>
            <div id="info-wrapper">
                <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
                <p>
                    <strong>Album name:</strong><span id="details-album">${album.album}</span>
                </p>
                <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
                <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
                <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
            </div>
            <div id="likes">Likes: <span id="likes-count">${totalCount}</span></div>

            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
                ${isOwner ? html`<a href="/edit/${album._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : nothing}
                ${hasUser && !isOwner && hasLiked === 0 ?
                        html`<a @click=${onLike} href="javascript:void(0)"
                                id="like-btn">Like</a>` : nothing}
            </div>
        </div>
    </section>`;


export async function showDetails(ctx) {
    const id = ctx.params.id;
    const totalCount = await getTotalCount(id);
    const album = await getById(id);
    const user = getUserData();
    const hasUser = Boolean(user);
    const isOwner = hasUser && user._id === album._ownerId;

    let hasLiked = 0;
    if (hasUser && !isOwner) {
        hasLiked = await getOwnLikes(id, user._id);
    }

    ctx.render(detailsTemplate(album, isOwner, hasUser, totalCount, hasLiked, onDelete, onLike));

    async function onDelete() {
        const choice = confirm('Are you sure you want do delete this album?');
        if (choice) {
            await deleteById(id);
            ctx.page.redirect('/dashboard');
        }
    }

    async function onLike() {
        await like(id);
        ctx.page.redirect(`/dashboard/${id}`);
    }
}