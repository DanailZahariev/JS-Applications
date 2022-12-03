import {html} from "../lib.js";
import {editAlbum, getById} from "../api/data.js";
import {createSubmitHandler} from "../utils.js";

const editTemplate = (album, onEdit) => html`
    <section id="edit">
        <div class="form">
            <h2>Edit Album</h2>
            <form @submit="${onEdit}" class="edit-form">
                <input type="text" .value=${album.singer} name="singer" id="album-singer" placeholder="Singer/Band"/>
                <input type="text" .value=${album.album} name="album" id="album-album" placeholder="Album"/>
                <input type="text" .value=${album.imageUrl} name="imageUrl" id="album-img" placeholder="Image url"/>
                <input type="text" .value=${album.release} name="release" id="album-release"
                       placeholder="Release date"/>
                <input type="text" .value=${album.label} name="label" id="album-label" placeholder="Label"/>
                <input type="text" .value=${album.sales} name="sales" id="album-sales" placeholder="Sales"/>

                <button type="submit">post</button>
            </form>
        </div>
    </section>`;

export async function showEdit(ctx) {
    const id = ctx.params.id;
    const album = await getById(id);
    ctx.render(editTemplate(album, createSubmitHandler(onEdit)));

    async function onEdit({singer, album, imageUrl, release, label, sales}) {

        if (!singer || !album || !imageUrl || !release || !label || !sales) {
            return alert('All fields are required!');
        }

        await editAlbum(id, {singer, album, imageUrl, release, label, sales});
        ctx.page.redirect(`/dashboard/${id}`);
    }
}