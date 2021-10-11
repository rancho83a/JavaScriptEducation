function solve(input) {

    let res = input
        .filter((x, index) => index % 2 !== 0)
        .map(x => x * 2)
        .reverse()
        .join(' ');
        console.log(res);
}

solve([10, 15, 20, 25]);