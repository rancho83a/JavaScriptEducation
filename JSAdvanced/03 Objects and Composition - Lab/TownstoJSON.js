function solve(input) {
    // let data = input.map((el) => el.replace(/ /gi, '').split('|').filter(x => x));
    let data = input.map(line => line.split('|').filter(x => x).map(x => x.trim()));
    let properti = data.shift();
    let res = [];
    data.forEach((row) => {
        obj = {
            [properti[0]]: row[0],
            [properti[1]]: Number(Number(row[1]).toFixed(2)),
            [properti[2]]:  Number(Number(row[2]).toFixed(2)),
        }
    res.push(obj);
    });
    console.log(JSON.stringify(res));
}

console(solve(['| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |']));


// let str = 'Apples are round, and apples are juicy.';
// let newstr = str.replace(/ /gi, '');
// console.log(newstr);