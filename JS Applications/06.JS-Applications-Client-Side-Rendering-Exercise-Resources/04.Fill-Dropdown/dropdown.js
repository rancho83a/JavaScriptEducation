import { html, render } from "../node_modules/lit-html/lit-html.js"
const selectTemplate = (list) => html`
<select id="menu">
    ${list.map(x => html`<option value="${x._id}"> ${x.text}</option>`)}
</select>
`;
const endpoint = "http://localhost:3030/jsonstore/advanced/dropdown";
const input = document.getElementById("itemText");
const div = document.querySelector('div');

downloadData()

async function downloadData() {
    document.querySelector('form').addEventListener('submit', (ev)=>addItem(ev,list));

    const response = await fetch(endpoint);
    const data = await response.json();
    const list = Object.values(data);
    update(list);
}

function update(list) {
    render(selectTemplate(list), div);
}

async function addItem(ev,list) {
    ev.preventDefault();
    const item = {
        text: input.value
    }
    const response = await fetch(endpoint, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    });

    if (response.ok) {
        const result = await response.json();
        list.push(result);
        update(list);
        input.value='';
    } else {
        const err = await response.json()
        return alert(err.message);
    }
}