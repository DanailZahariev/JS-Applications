const url = 'http://localhost:3030/jsonstore/collections/students';
const tbody = document.querySelector("tbody");
const form = document.querySelector('#form');
window.onload = solve;

async function solve() {
    form.addEventListener('submit', createNewUser);
    await getStudents();
}

async function getStudents() {
    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(s => {
        const tr = createHtmlElement('tr', '', tbody);
        createHtmlElement('td', s.firstName, tr);
        createHtmlElement('td', s.lastName, tr);
        createHtmlElement('td', s.facultyNumber, tr);
        createHtmlElement('td', s.grade, tr);
    });
}

async function createNewUser(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facultyNumber = formData.get('facultyNumber');
    const grade = formData.get('grade');

    if (!firstName || !lastName || !facultyNumber || !grade) {
        alert('All fields required!');
    } else {
        await fetch(url, {
            method: "post",
            headers: {"Content-type": "applications/json"},
            body: JSON.stringify({
                firstName: firstName, lastName: lastName,
                facultyNumber: facultyNumber, grade: grade
            })
        });
        await getStudents();
    }
}

function createHtmlElement(tagName, content, parent) {
    const element = document.createElement(tagName);
    element.textContent = content;
    if (parent) {
        parent.appendChild(element);
    }
    return element;
}