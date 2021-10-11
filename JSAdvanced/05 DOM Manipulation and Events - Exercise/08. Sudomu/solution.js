function solve() {
    let rows = document.querySelectorAll('tbody >tr');
    let btnCheck = document.querySelector("[colspan='3']").firstElementChild;
    let btnClear = document.querySelector("[colspan='3']").lastElementChild;
    let p = document.querySelector('#check >p');
    let table = document.querySelector('table');
    let cells =document.querySelectorAll('tbody input');

    let matrix = [];
    let msg = "You solve it! Congratulations!";
    let color = 'green';

    btnClear.addEventListener('click',()=>{
        console.log(cells);
        Array.from(cells).forEach(el=> el.value="");
        table.style.border=''; 
        p.textContent='';
    })

    btnCheck.addEventListener('click', onclick);
    function onclick() {
        for (let i = 0; i < rows.length; i++) {
            matrix.push([]);
            let cols = rows[i].children;
            for (let j = 0; j < cols.length; j++) {
                matrix[i].push(Number(cols[j].querySelector('input').value));
            }
        }

        let isSudoku = true;
        for (let i = 0; i < matrix.length - 1; i++) {
            if (sumHorizont(matrix[i]) !== sumHorizont(matrix[i + 1]) ||
                sumVertical(i) !== sumVertical(i + 1) ) {
                isSudoku = false;
                break;
            }
        }

        if(Array.from(cells).some(el=> el.value="" || el.value>matrix.length || el.value<1)){
            isSudoku=false;
        }

        if (!isSudoku) {
            color = "red"
            msg = 'NOP! You are not done yet...'
        }

        table.style.border = `2px solid ${color}`
        p.textContent = msg;
        p.style.color = color;
    }

    function sumHorizont(arr) {
        return arr.reduce((acc, current) => acc + current, 0);
    }

    function sumVertical(col) {
        let sum = 0;
        for (let i = 0; i < matrix.length; i++) {
            sum += matrix[i][col];
        }
        return sum;
    }
}
