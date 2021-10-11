window.addEventListener('load', getAllRecepies);

function getAllRecepies() {
    const url = 'http://localhost:3030/jsonstore/cookbook/recipes';
    const main = document.querySelector('main');

    fetch(url)
        .then(responce => responce.json())
        .then(recepies => {
            main.innerHTML='';
            Object.values(recepies).forEach(r => {
                let article = e('article', { className: 'preview' },
                    e('div', { className: "title" }, e('h2', {}, r.name)),
                    e('div', { className: "small" }, e('img', { src: r.img })),
                );
                main.appendChild(article);
            });
        })
        .catch(err => alert(err.message));
}

function e(type, attributes, ...params) {
    let element = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            element.addEventListener(attr.substring(2).toLocaleLowerCase(), value)
        } else {
            console.log(attr)
            element[attr] = value;
        }

    }

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