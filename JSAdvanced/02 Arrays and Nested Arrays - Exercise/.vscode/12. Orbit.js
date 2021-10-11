function orbit(input) {
    let [col, row, x, y] = input;

    let matrix = [];
    for (let i = 0; i < row; i++) {
        matrix.push([]);
    }

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            matrix[i][j]= Math.max(Math.abs(i-x),Math.abs(j-y))+1;
        }
    }
console.log(matrix.map(row=>row.join(' ')).join('\n'));

}

orbit([4, 4, 0, 0]);