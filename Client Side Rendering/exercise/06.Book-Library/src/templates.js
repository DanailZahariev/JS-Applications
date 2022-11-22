import {html} from '/node_modules/lit-html/lit-html.js';
import {getBooks} from "./views/catalog.js";
import {saveBook} from "./views/create.js";
import {showEditForm} from "./views/edit.js";
import {deleteBookById} from "./views/delete.js";

export const tableBody = html`
    <body>
    <button id="loadBooks" @click=${getBooks}>LOAD ALL BOOKS</button>
    <table>
        <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    </body>
`;

export const saveForm = html`
    <form @submit="${saveBook}" id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>
`;

export const editForm =
    html`
        <form id="edit-form" style="display: none">
            <input type="hidden" name="id">
            <h3>Edit book</h3>
            <label>TITLE</label>
            <input type="text" name="title" placeholder="Title...">
            <label>AUTHOR</label>
            <input type="text" name="author" placeholder="Author...">
            <input type="submit" value="Save">
        </form>
    `;

export function createTableRow(books) {
    return html`${Object.entries(books).map(([k, v]) => html`
        <tr id="${v[0]}">
            <td>${v[1].title}</td>
            <td>${v[1].author}</td>
            <td>
                <button @click="${showEditForm}">Edit</button>
                <button @click="${deleteBookById}" >Delete</button>
            </td>
        </tr>`)}`;
}