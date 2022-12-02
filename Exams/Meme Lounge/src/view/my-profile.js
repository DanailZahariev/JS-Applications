import {html} from "../lib.js";
import {getUserData} from "../utils.js";
import {getUserMemes} from "../api/data.js";

const myProfileTemplate = (user, memes) => html`
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
            <div class="user-content">
                <p>Username: ${user.username}</p>
                <p>Email: ${user.email}</p>
                <p>My memes count: ${memes.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            ${memes.length !== 0 ? memes.map(i => memeCard(i)) : html`<p class="no-memes"> No memes in
                database.</p>`}
        </div>
    </section>`;

const memeCard = (meme) => html`
    <div class="user-meme">
        <p class="user-meme-title">${meme.title}</p>
        <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
        <a class="button" href="/catalog/${meme._id}">Details</a>
    </div>
`;

export async function showUserProfile(ctx) {
    const user = getUserData();
    const userMemes = await getUserMemes(user._id);
    ctx.render(myProfileTemplate(user, userMemes));
}