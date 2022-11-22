import * as api from './request.js';

const endpoints = {
    allBooks: "/jsonstore/collections/books",
    booksById: "/jsonstore/collections/books/"
};

export async function loadAllBooks() {
    return api.get(endpoints.allBooks);
}

export async function createBook(book) {
    return api.post(endpoints.allBooks, book);
}

export async function updateBook(id, book) {
    return api.put(endpoints.booksById + id, book);
}

export async function deleteBook(id) {
    return api.del(endpoints.booksById + id);
}

export async function getBook(id) {
    return api.get(endpoints.booksById + id);
}

