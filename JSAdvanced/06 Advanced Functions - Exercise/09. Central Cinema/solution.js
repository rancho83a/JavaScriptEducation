function solve() {

    let onScreenBtn = document.querySelector('#container button');
    let btnClear = document.querySelector('#archive > button');
    console.log(btnClear);

    let infoMovie = document.querySelectorAll('input');
    let ul = document.querySelector('#movies ul');
    let sectionUl = document.querySelector('#archive ul');

    btnClear.addEventListener('click', () => {
        sectionUl.innerHTML = "";
    })
    onScreenBtn.addEventListener('click', onScreen);
    function onScreen(ev) {
        ev.preventDefault();
        let name = infoMovie[0].value;
        let hall = infoMovie[1].value;
        let price = infoMovie[2].value;

       
        if (!name || !hall ||  !Number(price)) {
            return;
        }
        price = Number(price);
        let span = createEl('span', name)
        let strong = createEl('strong', `Hall: ${hall}`);

        let strong2 = createEl('strong', `${price.toFixed(2)}`);
        let inputTicketSold = createEl('input', '', 'placeholder', 'Tickets sold');

        let btnArchive = createEl('button', 'Archive');

        let div = createEl('div');
        div.appendChild(strong2);
        div.appendChild(inputTicketSold)
        div.appendChild(btnArchive);

        let li = createEl('li');
        li.appendChild(span);
        li.appendChild(strong);
        li.appendChild(div);

        ul.appendChild(li);

        console.log(document.querySelector('#movies ul'));
        infoMovie[0].value = "";
        infoMovie[1].value = "";
        infoMovie[2].value = "";

        btnArchive.addEventListener('click', onArchive);


        function onArchive() {

            let count = inputTicketSold.value;

          
            if (!Number(count) && count!=='0') {
                return;
            }
            count=Number(count);

            let span2 = createEl('span', name)
            let strong3 = createEl('strong', `Total amount: ${(count * price).toFixed(2)}`);

            let btnDelete = createEl('button', 'Delete');

            let li2 = createEl('li');

            li2.appendChild(span2);
            li2.appendChild(strong3);
            li2.appendChild(btnDelete);

            sectionUl.appendChild(li2);
            li.remove();

            btnDelete.addEventListener('click', onDelete);
            function onDelete() {
                li2.remove();
            }
        }
    }

    function createEl(type, content, attribute, attrValue) {
        let element = document.createElement(type);
        element.textContent = content;

        if (attribute) {
            element.setAttribute(attribute, attrValue);
        }

        return element;
    }
}