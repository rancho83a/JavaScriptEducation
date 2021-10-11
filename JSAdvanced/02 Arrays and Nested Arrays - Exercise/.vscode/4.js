const solve = (arr) => {

    return arr.reduce((acc, x) => {
        if (x >= acc[acc.length-1] || acc.length===0) {
            acc.push(x);
        }
        return acc;
    }, []);
}

console.log(solve([1,
    3,
    8,
    4,
    10,
    12,
    3,
    2,
    24]))