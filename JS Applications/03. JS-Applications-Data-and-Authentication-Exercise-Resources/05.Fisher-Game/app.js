window.addEventListener('load', () => {
    load();
    document.querySelector('.load').addEventListener('click', load);
   // controlButtons();
});
async function load() {
    const data = await request("http://localhost:3030/data/catches");
    console.log(data);
    const info = data.map(createCatch).join('');
    document.getElementById('catches').innerHTML = info;
    controlButtons();
}

function controlButtons() {
    const token = sessionStorage.getItem('userToken');
    if (token != null) {
        [...document.querySelectorAll('button')].forEach(b => {
            b.disabled = false;
            if (b.className == 'update') {
                b.addEventListener('click', updateInfo);
            } else if (b.className == 'delete') {
                b.addEventListener('click', deleteInfo);
            } else if (b.className == 'add') {
                b.addEventListener('click', add);
            }
        });
    }
}
async function updateInfo(ev) {
    const updateForm = ev.target.parentNode;
    const id = updateForm.dataset.id;
    const token = sessionStorage.getItem('userToken');
    const _ownerId = sessionStorage.getItem('_ownerId');

    console.log(updateForm);
    const angler = updateForm.querySelector('.angler').value;
    const weight = updateForm.querySelector('.weight').value;
    const species = updateForm.querySelector('.species').value;
    const location = updateForm.querySelector('.location').value;
    const bait = updateForm.querySelector('.bait').value;
    const captureTime = updateForm.querySelector('.captureTime').value;

    validation({angler,weight,species,location,bait,captureTime});

    await request("http://localhost:3030/data/catches/" + id, {
        method: 'put',
        headers: {
            'X-Authorization': _ownerId,
            'X-Authorization': token
        },
        body: JSON.stringify({ angler, weight: Number(weight), species, location, bait, captureTime: Number(captureTime) })
    });
   load();
}

async function deleteInfo(ev) {
    const id = ev.target.parentNode.dataset.id;
    const token = sessionStorage.getItem('userToken');
    const _ownerId = sessionStorage.getItem('_ownerId');
   await request("http://localhost:3030/data/catches/" + id, {
        method: 'delete',
        headers: {
            'X-Authorization': _ownerId,
            'X-Authorization': token
        }
    });
    load();
}


async function add() {
    const addForm = document.getElementById('addForm');
    const angler = addForm.querySelector('.angler').value;
    const weight = addForm.querySelector('.weight').value;
    const species = addForm.querySelector('.species').value;
    const location = addForm.querySelector('.location').value;
    const bait = addForm.querySelector('.bait').value;
    const captureTime = addForm.querySelector('.captureTime').value;

   validation({angler,weight,species,location,bait,captureTime});
    const token = sessionStorage.getItem('userToken');

    request("http://localhost:3030/data/catches", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify({ angler, weight: Number(weight), species, location, bait, captureTime: Number(captureTime) })
    });
    load();
}

function createCatch(info) {
    return `<div data-ownerId = ${info._ownerId}  data-id = ${info._id} class="catch">
    <label>Angler</label>
    <input type="text" class="angler" value='${info.angler}'/>
    <hr>
    <label>Weight</label>
    <input type="number" class="weight" value='${+info.weight}'/>
    <hr>
    <label>Species</label>
    <input type="text" class="species" value='${info.species}'/>
    <hr>
    <label>Location</label>
    <input type="text" class="location" value='${info.location}'/>
    <hr>
    <label>Bait</label>
    <input type="text" class="bait" value='${info.bait}'/>
    <hr>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value='${info.captureTime}'/>
    <hr>
    <button disabled class="update">Update</button>
    <button disabled class="delete">Delete</button>
</div>`
}

async function request(url, option) {
    const response = await fetch(url, option);
    if (!response.ok) {
        const err = await response.json();
        alert(err.message);
        throw new Error(err.message);
    }
    return await response.json();
}

function validation({angler,weight,species,location,bait,captureTime}){
    if (!angler || !weight || !species || !location || !bait || !captureTime) {
        alert('required all fields');
        throw new Error('required all fields')
    }

    if (!Number.isInteger(Number(captureTime))) {
        alert('Capture Time must be Integer');
        throw new Error('Capture Time must be Integer')
    }
    if (Number(captureTime) <= 0 || Number(weight) <= 0) {
        alert('The number must be >0');
        throw new Error('the number must be>0')
    }
}
