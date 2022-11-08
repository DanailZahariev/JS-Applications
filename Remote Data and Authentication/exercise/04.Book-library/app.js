const loadBtn = document.getElementById('loadBooks');
const url = 'http://localhost:3030/jsonstore/collections/books';
const tbody = document.querySelector("tbody");
const form = document.querySelector('form');
const formBtn = document.querySelector('form button');
const h3 = document.querySelector('h3');
let bookId = '';
window.onload = init;

function init() {
    loadBtn.addEventListener('click', loadBooks);
    form.addEventListener('submit', createAndEditBook)
}

async function createAndEditBook(evt) {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    const title = formData.get('title');
    const author = formData.get('author');

    if (formBtn.textContent === 'Save') {
        if (!title || !author) {
            alert('All fields are required');
        } else {
            await fetch(`${url}/${bookId}`, {
                method: "PUT",
                headers:
                    {"Content-Type": "applications/json"},
                body: JSON.stringify({author, title})
            })
        }
        h3.textContent = 'FORM';
        formBtn.textContent = 'Submit';
    } else {
        if (!title || !author) {
            alert('All fields are required');
        } else {
            await fetch(url, {
                method: "POST",
                headers:
                    {"Content-Type": "applications/json"},
                body: JSON.stringify({author, title})
            });
        }
    }
    await loadBooks();
    form.reset();
}

async function loadBooks() {
    const response = await fetch(url);
    const data = await response.json();
    tbody.replaceChildren();

    Object.entries(data).forEach(([key, value]) => {
        const tr = createHtmlElement('tr', '', tbody);
        tr.id = key;
        createHtmlElement('td', `${value.title}`, tr);
        createHtmlElement('td', `${value.author}`, tr);
        const tdBtn = createHtmlElement('td', '', tr);
        const editBtn = createHtmlElement('button', 'Edit', tdBtn);
        editBtn.addEventListener('click', getEditBookData);
        const deleteBtn = createHtmlElement('button', 'Delete', tdBtn);
        deleteBtn.addEventListener('click', deleteBook);
    });
}

async function deleteBook(evt) {
    const id = evt.target.parentNode.parentElement.id;
    await fetch(url + `/${id}`, {
        method: "DELETE"
    });
    await loadBooks();
}

function getEditBookData(evt) {
    evt.preventDefault();
    bookId = evt.target.parentNode.parentElement.id;
    h3.textContent = 'Edit FORM';
    formBtn.textContent = 'Save';
    form.querySelector('input[name=title]').value = evt.target.parentNode.parentNode.children[0].textContent;
    form.querySelector('input[name=author]').value = evt.target.parentNode.parentNode.children[1].textContent;
}

function createHtmlElement(tagName, content, parent) {
    const element = document.createElement(tagName);
    if (content) {
        element.textContent = content;
    }
    if (parent) {
        parent.appendChild(element);
    }
    return element;
}