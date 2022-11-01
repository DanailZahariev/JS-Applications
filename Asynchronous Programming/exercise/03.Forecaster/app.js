const weatherSymbol = {
    "Sunny": "\u2600",
    "Partly sunny": "\u26c5",
    "Overcast": "\u2601",
    "Rain": "\u2602",
    "Degrees": "\u00b0",
};

let forecastContainer = document.getElementById('forecast');

function attachEvents() {

    document.getElementById('submit').addEventListener('click', getWeather);

    async function getWeather() {

        const url = 'http://localhost:3030/jsonstore/forecaster/locations';
        const townLocation = document.getElementById('location').value;
        try {
            const response = await fetch(url);
            const data = await response.json();
            const townInfo = data.find(e => e.name === townLocation);
            await createForecast(townInfo.code);
        } catch {
            forecastContainer.style.display = 'block';
            forecastContainer.textContent = 'Error';
        }
    }

    async function createForecast(code) {

        const todayUrl = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
        const threeDayUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

        try {
            const responseToday = await fetch(todayUrl);
            const dataToday = await responseToday.json();
            const responseThreeDay = await fetch(threeDayUrl);
            const dataThreeDay = await responseThreeDay.json();
            forecastContainer.style.display = 'block';

            createToday(dataToday);
            createThreeDay(dataThreeDay);
        } catch {
            forecastContainer.style.display = 'block';
            forecastContainer.textContent = 'Error';
        }
    }

    function createThreeDay(data) {
        const upcomingDiv = document.getElementById('upcoming');
        upcomingDiv.innerHTML = '';
        const containerDiv = createHtmlElements('div');
        containerDiv.classList.add('forecast-info');

        data.forecast.forEach(data => {
            const {condition, high, low} = data;

            const mainSpan = createHtmlElements('span');
            mainSpan.classList.add('upcoming');

            const iconSpan = createHtmlElements('span', `${weatherSymbol[condition]}`);
            iconSpan.classList.add('symbol');

            const tempSpan = createHtmlElements('span', `${low}${weatherSymbol['Degrees']}/${high}${weatherSymbol['Degrees']}`);
            tempSpan.classList.add('forecast-data');

            const conditionSpan = createHtmlElements('span', `${condition}`);
            conditionSpan.classList.add('forecast-data');

            mainSpan.appendChild(iconSpan);
            mainSpan.appendChild(tempSpan);
            mainSpan.appendChild(conditionSpan);
            containerDiv.appendChild(mainSpan);
            upcomingDiv.appendChild(containerDiv);
        });

    }

    function createToday(data) {
        const divCurrent = document.getElementById('current');
        divCurrent.innerHTML = '';
        const {condition, high, low} = data.forecast;
        const conditionContainer = createHtmlElements('div');
        conditionContainer.classList.add('forecast');

        const iconSpan = createHtmlElements('span', `${weatherSymbol[condition]}`);
        iconSpan.classList.add('condition', 'symbol');

        const conditionSpan = createHtmlElements('span');
        conditionSpan.classList.add('condition');

        const nameSpan = createHtmlElements('span', `${data.name}`);
        nameSpan.classList.add('forecast-data');

        const tempSpan = createHtmlElements('span', `${low}${weatherSymbol['Degrees']}/${high}${weatherSymbol['Degrees']}`);
        tempSpan.classList.add('forecast-data');

        const conditionSpanText = createHtmlElements('span', `${condition}`);
        conditionSpanText.classList.add('forecast-data');

        conditionSpan.appendChild(nameSpan);
        conditionSpan.appendChild(tempSpan);
        conditionSpan.appendChild(conditionSpanText);
        conditionContainer.appendChild(iconSpan);
        conditionContainer.appendChild(conditionSpan);
        divCurrent.appendChild(conditionContainer);
    }

    function createHtmlElements(tagName, content) {
        let element = document.createElement(tagName);
        if (content) {
            element.textContent = content;
        }
        return element;
    }
}

attachEvents();