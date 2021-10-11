function solve() {

    addBtn = document.getElementById('add').addEventListener('click', onAdd);
    let sections = document.querySelectorAll('section');

    function onAdd(ev) {
        ev.preventDefault();
        let fields = document.querySelectorAll('form input');
        let task = fields[0].value;
        let date = fields[1].value;
        let description = document.querySelector('textarea').value;

        if (!date || !task || !description) { return; }

        let h3 = createEl('h3', task);
        let p1 = createEl('p', `Description: ${description}`);
        let p2 = createEl('p', `Due Date: ${date}`);

        let startBtn = createEl('button', 'Start', 'green')
        let deleteBtn = createEl('button', 'Delete', 'red')

        let div = createEl('div', '', 'flex');
        div.appendChild(startBtn);
        div.appendChild(deleteBtn);

        let article = createEl('article', '');
        article.appendChild(h3);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(div)

        let mainDiv = sections[1].lastElementChild;
        mainDiv.appendChild(article);

        deleteBtn.addEventListener('click', () => {
            article.remove();
        })

        startBtn.addEventListener('click', onStart);

        function onStart() {
            let divProgress = sections[2].lastElementChild;
            divProgress.appendChild(article);

            startBtn.textContent = 'Delete';
            startBtn.className = 'red';
            startBtn.addEventListener('click', () => {
                article.remove();
            });

            deleteBtn.textContent = 'Finish';
            deleteBtn.className = 'orange';
            deleteBtn.addEventListener('click', onFinish);

            function onFinish() {
                let divComplete = sections[3].lastElementChild;
                divComplete.appendChild(article);
                divComplete.querySelector('div.flex').remove();
            }
        }
    }

    function createEl(type, content, className) {
        let el = document.createElement(type);

        el.textContent = content;
        if (className) {
            el.className = className;
        }
        return el;
    }
}