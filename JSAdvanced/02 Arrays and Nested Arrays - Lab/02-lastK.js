function solve (n,k){
    let res = [1];

    for (let i=1; i<n; i++){
        let lastLEl = res.slice(-k);
        res[i] = lastLEl.reduce((acc,x)=> acc+x,0);
    }
    return res;
}

solve(800000,500);
