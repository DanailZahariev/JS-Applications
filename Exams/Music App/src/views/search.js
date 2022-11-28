import {html, nothing} from "../lib.js";
import {getUserData} from "../utils.js";
import {searchAlbum} from "../api/data.js";

const searchTemplate = (album, user, onSearch) => html`
    <section id="searchPage">
        <h1>Search by Name</h1>
        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button @click="${onSearch}" class="button-list">Search</button>
        </div>
        <h2>Results:</h2>
        <div class="search-result">
            ${album.length === 0 ? html`<p class="no-result">No result.</p>` :
                    album.map(a => searchCard(a, user))}
        </div>
    </section>`;

const searchCard = (album, user) => html`
    <div class="card-box">
        <img src="${album.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            ${user ? html`
                <div class="btn-group">
                    <a href="/catalog/${album._id}" id="details">Details</a>
                </div>` : nothing}
        </div>
    </div>`


export async function showSearch(ctx) {
    let albums = [];
    const user = getUserData();
    ctx.render(searchTemplate(albums, user, onSearch));

    async function onSearch(evt) {
        evt.preventDefault();
        const searchInput = evt.target.parentElement.querySelector('#search-input');
        if (!searchInput) {
            return alert('Search input is empty!');
        }
        albums = await searchAlbum(searchInput.value);
        ctx.render(searchTemplate(albums, user, onSearch));
        searchInput.value = '';
    }
}