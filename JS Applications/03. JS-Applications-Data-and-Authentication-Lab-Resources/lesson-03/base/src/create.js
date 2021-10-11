document.querySelector('form').addEventListener('submit', createRecepie);

async function createRecepie(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);

    const name = formData.get('name');
    const img = formData.get('img');
    const ingredients = formData.get('ingredients')
        .split("\n")
        .map(l => l.trim())
        .filter(l => l != '');
    const steps = formData.get('steps')
        .split("\n")
        .map(l => l.trim())
        .filter(l => l != '');

    const token = sessionStorage.getItem('userToken');

    const url = 'http://localhost:3030/data/recipes';
    const responce = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify({name, img, ingredients, steps})
    });

    if (!responce.ok) {
        const err = await responce.json();
        return alert(err.message);
    }

    window.location.pathname = "index.html"

    console.log(name, img, ingredients, steps);
}