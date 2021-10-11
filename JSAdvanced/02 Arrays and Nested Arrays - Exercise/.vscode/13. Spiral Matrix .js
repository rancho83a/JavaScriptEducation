function spiral(rows, cols) {

    let matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
    }
    let count = 1; let row = 0; let col = 0;
    let totalCount = rows * rows;

    while (count <= totalCount) {

        for (let i = col; i < cols; i++) {
            matrix[row][i] = count++;
        }
        row++;

        for (let i = row; i < rows; i++) {
            matrix[i][cols - 1] = count++;
        }
        cols--;

        for (let i = cols - 1; i >= col; i--) {
            matrix[rows - 1][i] = count++;
        }
        rows--;

        for (let i = rows - 1; i >= row; i--) {
            matrix[i][col] = count++;
        }
        col++;
    }
    matrix.forEach(row => console.log(row.join(' ')));
}

spiral(5, 5);