import {createBook} from "../data.js";
import {getBooks} from "./catalog.js";

export async function saveBook(evt) {
    evt.preventDefault();
    const form = document.getElementById('add-form');
    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');

    if (!title || !author) {
        return alert('All fields required');
    }

    await createBook({title, author});
    form.reset();
    await getBooks();
}