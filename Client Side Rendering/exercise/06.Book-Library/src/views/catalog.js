import {loadAllBooks} from "../data.js";
import {render} from "/node_modules/lit-html/lit-html.js";
import {createTableRow} from "../templates.js";

export async function getBooks() {
    const tBody = document.querySelector('tbody');
    const req = await loadAllBooks();
    render(createTableRow(Object.entries(req)), tBody);
}


