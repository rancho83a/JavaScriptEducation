async function getInfo() {

    const id = document.getElementById('stopId');
    const url = 'http://localhost:3030/jsonstore/bus/businfo/';
    const ul = document.getElementById('buses');
    ul.innerHTML='';
    const div = document.getElementById('stopName');
    try {
        const responce = await fetch(url + id.value);
        const data = await responce.json();
        
        div.textContent = data.name;
        Object.entries(data.buses).forEach(([k, v]) => {
            let li = document.createElement('li');
            li.textContent = `Bus ${k} arrives in ${v}`;
            ul.appendChild(li);
        });
        id.value="";
    }
    catch (err) {
        div.textContent = "Error";
    }
}