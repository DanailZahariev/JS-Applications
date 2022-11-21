import {html, render} from "/node_modules/lit-html/lit-html.js";
import {towns} from "./towns.js";

const townsRoot = document.getElementById('towns');
const resultRoot = document.getElementById('result');
const btn = document.querySelector('button');
btn.addEventListener('click', search);

createTowns();

function createTowns(match) {
    const town = html`
        <ul>${towns.map(t => html`
            <li class="${(match && t.includes(match) ? "active" : "")}">${t}</li>`)}
        </ul>`;

    render(town, townsRoot);
}

function search() {
    const searchText = document.getElementById('searchText');
    const input = searchText.value;

    createTowns(input);
    counter();
}

function counter() {
    const matches = document.querySelectorAll('.active');
    const count = matches ? html`<p>${matches.length} matches found</p>` : '';
    render(count, resultRoot);
}