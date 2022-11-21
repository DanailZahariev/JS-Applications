import {html, render} from "/node_modules/lit-html/lit-html.js";

const root = document.getElementById('root');
const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);


function onSubmit(evt) {
    evt.preventDefault();

    const formData = new FormData(form);
    const towns = formData.get('towns');
    const input = towns.split(', ');
    renderTowns(input);

    form.reset();
}

function renderTowns(data) {
    const result = createTowns(data);
    render(result, root);
}

function createTowns(data) {
    return html`
        <ul>${data.map(t => html`
            <li>${t}</li>`)}
        </ul>`;
}
