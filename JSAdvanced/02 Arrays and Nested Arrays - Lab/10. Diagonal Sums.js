function solve(matrix){
    let sumMain=0;
    let sumReverse=0;

    for(let i=0; i<matrix.length; i++){
        sumMain+=matrix[i][i];
        sumReverse+=matrix[i][matrix.length-1-i];
    }
    console.log(sumMain, sumReverse);
}

solve([[20, 40],
    [10, 60]]);