import {html, nothing} from "../lib.js";
import {createSubmitHandler, getUserData} from "../utils.js";
import {searchItems} from "../api/data.js";

const searchTemplate = (item, user) => html`
    <section id="search">
        <h2>Search by Brand</h2>
        <form @submit=${onSearch} class="search-wrapper cf">
            <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
            <button type="submit">Search</button>
        </form>
        <h3>Results:</h3>
        <div id="search-container">
            <ul class="card-wrapper">
                ${item && item.length !== 0 ? item.map(item => searchCard(item, user)) : nothing}
                ${item && item.length === 0 ? html`<h2>There are no results found.</h2>` : nothing};
            </ul>
        </div>
    </section>`;

const searchCard = (item, user) => html`
    <li class="card">
        <img src="${item.imageUrl}" alt="travis"/>
        <p>
            <strong>Brand: </strong><span class="brand">${item.brand}</span>
        </p>
        <p>
            <strong>Model: </strong
            ><span class="model">${item.model}</span>
        </p>
        <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
        ${user ? html`<a class="details-btn" href="/catalog/${item._id}">Details</a>` :
                nothing}
    </li>`;

let context;

export async function showSearch(ctx) {
    context = ctx;
    context.render(searchTemplate());
}

async function onSearch(evt) {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData);
    const user = getUserData();

    if (!data.search) {
        return alert('Search input is empty!');
    }
    const items = await searchItems(data.search);
    context.render(searchTemplate(items, user));
    evt.target.reset();
}