import {showView} from "./util.js";
import {homePage} from "./home.js";

const createSection = document.querySelector('#add-movie');
const form = createSection.querySelector('form');
form.addEventListener('submit', create);

export function createPage() {
    showView(createSection);
}

async function create(evt) {
    evt.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('img');

    if (title === '' || description === '' || img === '') {
        alert("All fields are require");
    }
    const user = JSON.parse(localStorage.getItem('user'));
    try {

        const response = await fetch('http://localhost:3030/data/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify({title, description, img})
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message);
        }

        form.reset();
        await homePage();

    } catch (e) {
        console.log(e.message);
    }
}