function attack(matrix) {
    let mx = [];
    matrix.forEach((row, i) => {
        matrix[i] = row.split(' ').map(n => Number(n));
        mx[i] = matrix[i].slice();//copy
    });

    let diagonal1 = 0;
    let diagonal2 = 0;

    for (let i = 0; i < matrix.length; i++) {
        diagonal1 += matrix[i][i];
        diagonal2 += matrix[i][matrix.length - 1 - i];
        mx[i][i] = '*';
        mx[i][matrix.length - 1 - i] = '*';
    }

    if (diagonal1 !== diagonal2) {
        printMatrix(matrix);
        return;
    }

    mx.forEach((row, i) => {
        row.forEach((element, j) => {
            if (element === '*') {
                row[j] = matrix[i][j];
            } else {
                row[j] = diagonal2;
            }
        });
    });
    printMatrix(mx);

    function printMatrix(matrixForPrint) {
        matrixForPrint.forEach((row, i) => {
            console.log(row.join(' '));
        });
    }
}

attack(['5 3 12 3 1',
'11 4 23 2 5',
'101 12 3 21 10',
'1 4 5 2 2',
'5 22 33 11 1']
);