function solve(matrix) {
    // let max = matrix[0][0];
    // matrix.forEach(row => {
    //     row.forEach(el => {
    //         max = Math.max(max, el);
    //     })
    // });
    let maxN = matrix.map(row => Math.max(...row));
return Math.max(...maxN);
}



console.log(solve([[20, 50, 10],
[8, 33, 145]]))