function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const phonebook = document.getElementById('phonebook');
    const person = document.getElementById('person');
    const phone = document.getElementById('phone');
    const loadBtn = document.getElementById('btnLoad');
    const btnCreate = document.getElementById('btnCreate');
    btnCreate.addEventListener('click', createContact);
    loadBtn.addEventListener('click', loadContacts);

    async function createContact() {

        try {
            const response = await fetch(url, {
                method: "post",
                headers: {"Content-Type": "application-json"},
                body: JSON.stringify({person: person.value, phone: phone.value})
            });

            if (!response.ok) {
                throw new Error();
            }
            person.value = '';
            phone.value = '';

        } catch (e) {
            console.error(e.message)
        }
    }

    async function loadContacts() {

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error();
            }

            const data = await response.json();

            Object.values(data).forEach(c => {
                const li = document.createElement('li');
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                li.id = `${c._id}`;
                li.textContent = `${c.person}: ${c.phone}`
                li.appendChild(deleteBtn);
                phonebook.appendChild(li);
                deleteBtn.addEventListener('click', deleteContact)
            });

        } catch (e) {
            console.error(e.message)
        }
    }

    async function deleteContact(e) {
        const personId = e.target.parentElement.id;

        await fetch(url + `/${personId}`, {
            method: "delete"
        });
        document.getElementById(personId).remove();
    }
}

attachEvents();