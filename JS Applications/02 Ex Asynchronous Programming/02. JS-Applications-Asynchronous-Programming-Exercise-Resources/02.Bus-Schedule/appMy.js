function solve() {
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    let url = 'http://localhost:3030/jsonstore/bus/schedule/';
    let id = 'depot'
    let span = document.querySelector('.info');
    let info;


    async function depart() {
        const responce = await fetch(url + id);
        info = await responce.json();
        span.textContent = 'Next stop ' + info.name;
        id = info.next;
        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    function arrive() {
        span.textContent = 'Arriving at ' + info.name;

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();