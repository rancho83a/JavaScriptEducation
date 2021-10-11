 function solve(matrix) {
    let count = 0;
    let longestRow = matrix[0].length;
    for (const row of matrix) {
        longestRow=Math.max(longestRow,row.length);
        for (let i = 0; i < row.length - 1; i++) {
            if (row[i] === row[i + 1]) {
                count++;
            }
        }
    }
    for(let i=0; i<longestRow;i++){
        for(j=0; j<matrix.length-1;j++)
        if(matrix[j+1] && matrix[j][i]===matrix[j+1][i] ){
            count++;
        }
    }
    //console.log(matrix.length)

    return count;
}

console.log(solve([['2', '3', '4', '7', '0'],
['4', '0', '5', '3', '4'],
['2', '3', '5', '4', '4'],
['9', '8', '7', '5', '4']]));