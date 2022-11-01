async function solution() {
    let url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    let mainSection = document.getElementById('main');

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error();
        }

        let data = await response.json();

        for (let value of Object.values(data)) {
            let info = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${value._id}`);

            if (!info.ok) {
                throw new Error();
            }
            let data = await info.json();

            let divAccordion = createHtmlElement('div', '', 'accordion', mainSection);
            let divHead = createHtmlElement('div', '', 'head', divAccordion);
            createHtmlElement('span', `${value.title}`, '', divHead);
            let button = createHtmlElement('button', 'More', 'button', divHead)
            button.id = `${value._id}`;

            let divExtra = createHtmlElement('div', '', 'extra', divAccordion);
            createHtmlElement('p', `${data.content}`, '', divExtra);

            button.addEventListener("click", e => {
                if (button.textContent === "More") {
                    button.textContent = "Less";
                    divExtra.style.display = "block";
                } else {
                    button.textContent = "More";
                    divExtra.style.display = "none";
                }
            });
        }
    } catch (e) {

    }
}

function createHtmlElement(tagName, content, className, parent) {
    const element = document.createElement(tagName);
    element.textContent = content;
    if (className) {
        element.className = className;
    }
    if (parent) {
        parent.appendChild(element);
    }
    return element;
}

solution();