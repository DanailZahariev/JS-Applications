import {html} from "../lib.js";
import {createSubmitHandler} from "../utils.js";
import {editMemeById, getMemeById} from "../api/data.js";
import {notification} from "./notification.js";

const editTemplate = (meme, onEdit) => html`
    <section id="edit-meme">
        <form @submit="${onEdit}" id="edit-form">
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input id="title" type="text" .value=${meme.title} placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea id="description" .value=${meme.description} placeholder="Enter Description"
                          name="description">
                </textarea>
                <label for="imageUrl">Image Url</label>
                <input id="imageUrl" .value=${meme.imageUrl} type="text" placeholder="Enter Meme ImageUrl"
                       name="imageUrl">
                <input type="submit" class="registerbtn button" value="Edit Meme">
            </div>
        </form>
    </section>`;


export async function showEdit(ctx) {
    const id = ctx.params.id;
    const meme = await getMemeById(id);
    ctx.render(editTemplate(meme, createSubmitHandler(onEdit)));


    async function onEdit({title, description, imageUrl}) {

        if (title === '' || description === '' || imageUrl === '') {
            return notification('All fields are required!');
        }

        await editMemeById(id, {title, description, imageUrl});
        ctx.page.redirect('/catalog');
    }
}