function solve(input){
    let res=[];
    for (const num of input) {
        if(num>=0){
            res.push(num);
        } else {
            res.unshift(num);
        }
    }
    console.log(res.join('\n'));
}

solve([7, -2, 8, 9])
solve([3, -2, 0, -1])