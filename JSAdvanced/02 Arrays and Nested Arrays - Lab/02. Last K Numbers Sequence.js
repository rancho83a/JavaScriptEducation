function solve(n, k) {
    let seq = [1];

    for (let i = 1; i < n; i++) {

        let sum = 0;
        for(let j = 1; j <= k; j++) {
            if((i-j)>=0){
            sum+= seq[i-j];
            }
        }
        seq[i] = sum;
    }
console.log(seq);
}
//solve(6, 3);
solve(8,2);