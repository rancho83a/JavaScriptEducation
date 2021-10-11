window.addEventListener('load', getAllRecepies);


async function getAllRecepies() {
    const main = document.querySelector('main');
    const url = 'http://localhost:3030/jsonstore/cookbook/recipes';

    try {
        const responce = await fetch(url);
        if (!responce.ok) {
            throw new Error(responce.statusText);
        }
        const recepies = await responce.json();

        main.innerHTML = '';

        Object.values(recepies).map(createPreview).forEach(r => main.appendChild(r));
    }
    catch (err) {
        alert(err.message)
    };
}

function createPreview(recepie) {
    let article = e('article', { className: 'preview' },
        e('div', { className: "title" }, e('h2', {}, recepie.name)),
        e('div', { className: "small" }, e('img', { src: recepie.img })),
    );

    article.addEventListener('click', (ev) => getRecepieDetails(recepie._id, article));

    return article;
}

async function getRecepieDetails(id, preview) {
    const responce = await fetch(`http://localhost:3030/jsonstore/cookbook/details/${id}`);
    const data = await responce.json();
    const card = e('article', {},
        e('h2', {onClick:togleCard}, data.name),
        e('div', { className: 'band' },
            e('div', { className: 'thumb' }, e('img', { src: data.img })),
            e('div', { className: 'ingredients' }, 
                e('h3', {}, 'Ingredients:'),
                e('ul', {}, data.ingredients.map(i => e('li', {}, i)))
            )
        ),
        e('div', { className: 'description' },
            e('h3', {}, 'Preparation:'),
            data.steps.map(s=> e('p',{},s))
        )
    );
    //preview.innerHTML=card.innerHTML;
    //preview.parentNode.replaceChild(card,preview)
    preview.replaceWith(card);
    function togleCard(){
        card.replaceWith(preview);
    }
}

function e(type, attributes, ...params) {
    let element = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            element.addEventListener(attr.substring(2).toLocaleLowerCase(), value)
        } else {
            element[attr] = value;
        }
    }

    params=params.reduce((a,c) =>a.concat(Array.isArray(c) ? c : [c]),[]);

    params.forEach(p => {
        if (typeof p == 'string') {
            let content = document.createTextNode(p);
            element.appendChild(content);
        }
        else {
            element.appendChild(p);
        }
    })



    return element;
}