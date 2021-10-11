import {showDetails} from "./details.js"

async function onSubmit(data) {

    const recipeId =data.id; 
    const body = JSON.stringify({
        name: data.name,
        img: data.img,
        ingredients: data.ingredients.split('\n').map(l => l.trim()).filter(l => l != ''),
        steps: data.steps.split('\n').map(l => l.trim()).filter(l => l != '')
    });

    const token = sessionStorage.getItem('authToken');
    if (token == null) {
        return alert('You are not logged in');
    }

    try {
        const response = await fetch('http://localhost:3030/data/recipes/'+recipeId, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body
        });

        if (response.status == 200) {
            showDetails(recipeId);
        } else {
            throw new Error(await response.json());
        }
    } catch (err) {
        console.error(err.message);
    }
}

async function getRecipeById(id) {
    const response = await fetch('http://localhost:3030/data/recipes/' + id);
    const recipe = await response.json();
    return recipe;
}

let main;
let section;
let setColorActiveNav;

export function setupEdit(mainTarget, sectionTarget, setColorActiveNavCb) {
    main = mainTarget;
    section = sectionTarget;
    setColorActiveNav = setColorActiveNavCb;
    const form = section.querySelector('form');

    form.addEventListener('submit', (ev => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        onSubmit([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
        //  ev.target.reset();
    }));
}

export async function showEdit(id) {
    setColorActiveNav();

    main.innerHTML = "";
    main.appendChild(section);

    const recepi = await getRecipeById(id);
    section.querySelector('[name="id"]').value = id;
    section.querySelector('[name="name"]').value = recepi.name;
    section.querySelector('[name="img"]').value = recepi.img;
    section.querySelector('[name="ingredients"]').value = recepi.ingredients.join('\n');
    section.querySelector('[name="steps"]').value = recepi.steps.join('\n');
}