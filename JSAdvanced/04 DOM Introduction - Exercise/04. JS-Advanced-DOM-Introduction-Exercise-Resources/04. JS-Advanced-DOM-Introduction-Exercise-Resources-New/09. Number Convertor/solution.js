function solve() {
    let toMenu = document.querySelector('#selectMenuTo');


    let bi = document.createElement('option');
    bi.textContent = 'Binary';
    bi.value = 'binary';
    let hex = bi.cloneNode(true);
    hex.textContent = 'Hexadecimal';
    hex.value = 'hexadecimal';


    toMenu.appendChild(bi);
    toMenu.appendChild(hex);

    const choose = {
        'binary': (num) => num.toString(2),
        'hexadecimal': (num) => num.toString(16).toUpperCase()
    }


    document.querySelector('button').addEventListener('click', onclick);
    function onclick() {
        let num = Number(document.getElementById('input').value);
        let result = document.getElementById('result');
        result.value = choose[toMenu.value](num);

    }
}