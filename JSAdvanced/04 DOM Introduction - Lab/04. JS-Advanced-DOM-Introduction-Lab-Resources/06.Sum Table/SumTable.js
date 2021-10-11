function sumTable() {


    let rows = [...document.querySelectorAll('table tr')].slice(1, -1);

    let res = rows.reduce((sum, item) => {
        return sum + Number(item.lastElementChild.textContent)
    }, 0);

    document.getElementById('sum').textContent = res;
    // let rows = document.querySelectorAll('table tr');
    // let sum = 0;
    // for (i = 1; i < rows.length - 1; i ++) {
    //     let cell = rows[i].children;
    //     sum+=Number(cell[cell.length-1].textContent);
    // }
    // cells = document.querySelectorAll('table td');
    // cells[cells.length-1].textContent=sum;

}