async function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', load);
    document.getElementById('btnCreate').addEventListener('click', createPerson);
    document.querySelector('ul').addEventListener('click', deletePersone);
}
attachEvents();

async function createPerson() {
    const person = document.getElementById('person');
    const phone = document.getElementById('phone');
    await request('http://localhost:3030/jsonstore/phonebook',{
        method:'post',
        body: JSON.stringify({person:person.value,phone:phone.value})
    })
    person.value="";
    phone.value="";
    load();
}

async function load() {
    const data = await request('http://localhost:3030/jsonstore/phonebook');
    const ul = document.getElementById('phonebook');
    ul.innerHTML = "";
    Object.values(data).forEach(p => {
        ul.appendChild(createNotes(p))
    });
}

function createNotes(info) {
    const li = document.createElement('li');
    li.textContent = `${info.person}: ${info.phone}`;
    const btnDel = document.createElement('button');
    btnDel.textContent = 'Delete';
    btnDel.id = info._id;
    li.appendChild(btnDel);
    return li;
}

async function deletePersone(ev) {
    if (ev.target.tagName == "BUTTON") {
        await request('http://localhost:3030/jsonstore/phonebook/' + ev.target.id, {
            method: 'delete'
        })
        load();
    }
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