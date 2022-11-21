import {html, render} from "/node_modules/lit-html/lit-html.js";
import {cats} from "./catSeeder.js";

const section = document.getElementById('allCats');

const template = html`
    <ul>
        ${cats.map(cat => createCatCard(cat))}
    </ul>`;

render(template, section);


function createCatCard(cat) {
    return html`
        <li><img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button @click="${showCatDetails}" class="showBtn">Show status code</button>
                <div class="status" style="display: none" id="${cat.id}">
                    <h4>Status Code: ${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p>
                </div>
            </div>
        </li>`;
}

function showCatDetails(evt) {
    evt.preventDefault();
    const container = evt.target.parentElement.querySelector('div');
    const state = container.style.display;

    if (state === 'none') {
        container.style.display = 'block';
        evt.target.textContent = 'Hide status code';
    } else {
        container.style.display = 'none';
        evt.target.textContent = 'Show status code';
    }
}