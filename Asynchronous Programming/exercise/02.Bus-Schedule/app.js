function solve() {

    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    const spanInfo = document.querySelector('#info span');
    const url = ' http://localhost:3030/jsonstore/bus/schedule/depot';

    async function depart() {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error();
            }
            const data = await response.json();

            departBtn.disabled = true;
            arriveBtn.disabled = false;
            spanInfo.textContent = `Next stop ${data.name}`;

        } catch (e) {
            spanInfo.textContent = 'Error';
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }

    async function arrive() {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error();
            }

            const data = await response.json();
            departBtn.disabled = false;
            arriveBtn.disabled = true;
            spanInfo.textContent = `Arriving at ${data.name}`;
        } catch (e) {
            spanInfo.textContent = 'Error';
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }

    return {
        depart,
        arrive
    };
}

let result = solve();