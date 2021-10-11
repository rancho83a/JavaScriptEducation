function attachEvents() {
    onrefresh();
    document.getElementById('submit').addEventListener('click', onsubmit);
    document.getElementById('refresh').addEventListener('click', onrefresh);
}
attachEvents();
async function onrefresh() {
    const url = 'http://localhost:3030/jsonstore/messenger';

    const response = await fetch(url);
    const data = await response.json();
    const text = Object.values(data);

    const textArea = document.getElementById('messages');
    textArea.value = text.map(m => `${m.author}: ${m.content}`).join('\n');
}

async function onsubmit() {
    const name = document.querySelector('[name="author"]');
    const msg = document.querySelector('[name="content"] ');


    const url = 'http://localhost:3030/jsonstore/messenger';

    const response = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            author: name.value,
            content: msg.value,
        })
    });
    name.value = "";
    msg.value = "";
    onrefresh();

}
