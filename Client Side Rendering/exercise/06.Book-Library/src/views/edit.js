import {getBook, updateBook} from "../data.js";
import {getBooks} from "./catalog.js";

export async function showEditForm(evt) {
    evt.preventDefault();
    const addForm = document.getElementById('add-form');

    addForm.addEventListener("submit", getData);
    const editForm = document.getElementById('edit-form');

    addForm.style.display = 'none';
    editForm.style.display = 'block';

    const id = evt.target.parentElement.parentElement.id;
    const book = await getBook(id);
    editForm.querySelector('input[name=title]').value = book.title;
    editForm.querySelector('input[name=author]').value = book.author;

    editForm.addEventListener('submit', (e) => getData(e, id));
}

export async function getData(evt, id) {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    const title = formData.get('title');
    const author = formData.get('author');

    if (!title || !author) {
        return alert('All fields required');
    }
    const addForm = document.getElementById('add-form');
    const editForm = document.getElementById('edit-form');

    await updateBook(id, {title, author});
    editForm.reset();
    addForm.style.display = 'block';
    editForm.style.display = 'none';

    await getBooks();
}