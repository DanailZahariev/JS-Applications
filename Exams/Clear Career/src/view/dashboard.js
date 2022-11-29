import {html} from "../lib.js";
import {getAll} from "../api/data.js";

const dashboardTemplate = (items) => html`
    <section id="dashboard">
        <h2>Job Offers</h2>
        ${items.length !== 0 ? items.map(i => itemCard(i)) : html`<h2>No offers yet.</h2>`}
    </section>`;

const itemCard = (item) => html`
    <div class="offer">
        <img src="${item.imageUrl}" alt="example1"/>
        <p>
            <strong>Title: </strong><span class="title">${item.title}</span>
        </p>
        <p><strong>Salary:</strong><span class="salary">${item.salary}</span></p>
        <a class="details-btn" href="/dashboard/${item._id}">Details</a>
    </div>`;

export async function showDashboard(ctx) {
    const items = await getAll();
    ctx.render(dashboardTemplate(items));
}