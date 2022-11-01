async function lockedProfile() {

    const mainDiv = document.getElementById('main');
    let url = "http://localhost:3030/jsonstore/advanced/profiles";
    mainDiv.replaceChildren();

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error();
        }

        const data = await response.json();

        let id = 1;
        for (let p of Object.values(data)) {
            let {username, email, age} = p;
            let divProfile = createHtmlElement('div', '', 'profile', mainDiv);
            let img = createHtmlElement('img', '', 'userIcon', divProfile);
            img.setAttribute('src', './iconProfile2.png');
            createHtmlElement('label', 'Lock', '', divProfile);

            let lockInput = createHtmlElement('input', '', '', divProfile);
            lockInput.setAttribute('type', 'radio');
            lockInput.setAttribute('name', `user${id}Locked`);
            lockInput.setAttribute('value', 'lock');
            lockInput.setAttribute('checked', true);
            createHtmlElement('label', 'Unlock', '', divProfile);

            let unlockInput = createHtmlElement('input', '', '', divProfile);
            unlockInput.setAttribute('type', 'radio');
            unlockInput.setAttribute('name', `user${id}Locked`);
            unlockInput.setAttribute('value', 'unlock');

            createHtmlElement('br', '', '', divProfile);
            createHtmlElement('hr', '', '', divProfile);

            createHtmlElement('label', 'Username', '', divProfile);
            let userName = createHtmlElement('input', '', '', divProfile);
            userName.setAttribute('type', 'text');
            userName.setAttribute('name', `user${id}Username`);
            userName.setAttribute('value', `${username}`);
            userName.setAttribute('disabled', true);
            userName.setAttribute('readonly', true);

            let userDiv = createHtmlElement('div', '', '', divProfile);
            userDiv.setAttribute('id', 'userHiddenFields');
            createHtmlElement('hr', '', '', userDiv);

            createHtmlElement('label', 'Email:', '', userDiv);
            let emailInput = createHtmlElement('input', '', '', userDiv);
            emailInput.setAttribute('type', 'email');
            emailInput.setAttribute('name', `user${id}email`);
            emailInput.setAttribute('value', `${email}`);
            emailInput.setAttribute('disabled', true);
            emailInput.setAttribute('readonly', true);

            createHtmlElement('label', 'Age:', '', userDiv);
            let ageInput = createHtmlElement('input', '', '', userDiv);
            ageInput.setAttribute('type', 'email');
            ageInput.setAttribute('name', `user${id}age`);
            ageInput.setAttribute('value', age);
            ageInput.setAttribute('disabled', true);
            ageInput.setAttribute('readonly', true);
            id++;

            let btnShow = createHtmlElement('button', 'Show more', '', divProfile);
            btnShow.addEventListener('click', (e) => {

                if (unlockInput.checked && e.target.textContent === 'Show more') {
                    userDiv.style.display = 'block';
                    btnShow.textContent = 'Hide it';
                } else if (unlockInput.checked && e.target.textContent === 'Hide it') {
                    userDiv.style.display = 'none';
                    btnShow.textContent = 'Show more';
                }
            });
        }

    } catch (e) {
        console.log(e.status);
    }

    function createHtmlElement(tagName, content, className, parent) {
        const element = document.createElement(tagName);
        element.textContent = content;
        element.className = className;

        if (parent) {
            parent.appendChild(element);
        }
        return element;
    }
}