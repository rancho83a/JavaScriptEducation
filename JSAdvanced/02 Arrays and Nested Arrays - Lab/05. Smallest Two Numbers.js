function solve(numbers) {
    let res = numbers
        .sort((a, b) => a - b)
        .slice(0,2)
        .join(" ");
    console.log(res);
}

solve([30, 15, 50, 5]);