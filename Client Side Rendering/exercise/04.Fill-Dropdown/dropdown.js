const url = 'http://localhost:3030/jsonstore/advanced/dropdown';
import {html, render} from "/node_modules/lit-html/lit-html.js";

const mainRoot = document.getElementById('menu');
const form = document.querySelector('form');
form.addEventListener('submit', onSubmit)

await onLoad();

async function onLoad() {
    const response = await fetch(url);
    const data = await response.json();

    const result = Object.values(data).map(o => createOption(o));
    render(result, mainRoot);
}

async function onSubmit(evt) {
    evt.preventDefault();
    const value = document.getElementById('itemText').value;
    value && await addItem(value);
}

async function addItem(value) {

    await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify({text: value})
    });
    form.reset();
    await onLoad();
}

function createOption(o) {
    return html`
        <option value="${o._id}">${o.text}</option>`
}