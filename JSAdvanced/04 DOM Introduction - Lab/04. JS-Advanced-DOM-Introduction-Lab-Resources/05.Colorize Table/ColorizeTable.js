function colorize() {
    // TODO
    // let rows = document.querySelectorAll('tr');
    // for (let i = 1; i < rows.length; i+=2) {
    //     rows[i].style.background = 'teal';
    // }
    [...document.querySelectorAll('tr:nth-child(even)')].forEach(e=> e.style.background = 'teal');
}