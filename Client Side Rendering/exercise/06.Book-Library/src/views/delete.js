import {deleteBook} from "../data.js";
import {getBooks} from "./catalog.js";

export async function deleteBookById(evt) {
    evt.preventDefault();
    const id = evt.target.parentElement.parentElement.id;
    await deleteBook(id);

    await getBooks();
}