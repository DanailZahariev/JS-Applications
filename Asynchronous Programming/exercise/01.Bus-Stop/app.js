async function getInfo() {

    const stopId = document.getElementById('stopId').value;
    const busList = document.getElementById('buses');
    const stopName = document.getElementById('stopName');

    busList.innerHTML = '';
    stopName.innerHTML = '';

    try {
        const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`);

        const data = await response.json();
        stopName.textContent = data.name;

        Object.entries(data.buses).forEach(([buss, arrival]) => {
            const li = document.createElement('li');
            li.textContent = `Bus ${buss} arrives in ${arrival} minutes`;
            busList.appendChild(li);
        });

    } catch (e) {
        stopName.textContent = 'Error';
    }
}

module.exports = getInfo;