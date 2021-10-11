function solve(matrix) {
    let res = true;
    let sum = matrix[0].reduce((acc, el) => acc + el);

    for (let row = 1; row < matrix.length; row++) {
        if (sum !== matrix[row].reduce((acc, el) => acc + el)) {
            return false;
        }
    }

    for (let i = 0; i < matrix[0].length; i++) {
        let columnSum = 0;
        for (let j = 0; j < matrix.length; j++) {
            columnSum += matrix[j][i];
        }
        if(sum!==columnSum){
            return false;
        }
    }

    return true;

}
console.log(solve([[1, 5, 6],
[6, 5, 4],
[5, 5, 5]]));
