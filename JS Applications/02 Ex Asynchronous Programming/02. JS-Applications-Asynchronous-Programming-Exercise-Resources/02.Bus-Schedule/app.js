function solve() {
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    let url = 'http://localhost:3030/jsonstore/bus/schedule/';
    let span = document.querySelector('.info');
    let stop = {
        next: 'depot'
    }


    async function depart() {
        const responce = await fetch(url + stop.next);
        const info = await responce.json();
        stop = info;
        span.textContent = 'Next stop ' + stop.name;
        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    function arrive() {
        span.textContent = 'Arriving at ' + stop.name;

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();