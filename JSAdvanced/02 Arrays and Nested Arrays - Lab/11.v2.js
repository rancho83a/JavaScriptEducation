function solve(matrix) {
    let count = 0;

    matrix.forEach((row, i) => {
        row.forEach((element, j) => {
            if (element === row[j+1]) {
                count++;
            }
            if (matrix[i + 1] && element === matrix[i + 1][j]){
                count++;
            }
        });
    });
    return count;
}
console.log(solve([['2', '3', '4', '7', '0'],
['4', '0', '5', '3', '4'],
['2', '3', '5', '4', '2'],
['9', '8', '7', '5', '4']]));