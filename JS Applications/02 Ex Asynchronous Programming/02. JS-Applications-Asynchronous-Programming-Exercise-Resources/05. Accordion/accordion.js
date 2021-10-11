window.addEventListener('load', solution);
async function solution() {

    try {

        const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
        const responce = await fetch(url);
        const titles = await responce.json();

        titles.map(createArticle);
        controlButtons();
    } catch (err) {
        const main = document.getElementById('main');
        main.innerHTML = "Something Went Wrong! " + err.message;

    }
}

async function createArticle(title) {
    const urlText = 'http://localhost:3030/jsonstore/advanced/articles/details/' + title._id;
    const textResponce = await fetch(urlText);
    const text = await textResponce.json();

    const main = document.getElementById('main');
    main.innerHTML = main.innerHTML +
        ` <div class="accordion">
    <div class="head">
        <span>${title.title}</span>
        <button class="button" id="${title._id}">More</button>
    </div>
    <div class="extra">
        <p>${text.content}</p>
    </div>
</div>`

}

function controlButtons() {
    document.getElementById('main').addEventListener('click', onclick);
    function onclick(ev) {
        let btn = ev.target;
        if (btn.tagName !== 'BUTTON') return;
        btn.textContent = btn.textContent === 'More' ? 'Less' : 'More';
        const div = btn.parentNode.parentNode.querySelector('.extra');
        div.style.display = div.style.display == 'inline' ? 'none' : 'inline';
    }
}

