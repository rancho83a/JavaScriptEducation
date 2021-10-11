function solution() {

    let stock = { protein: 0, carbohydrate: 0, fat: 0, flavour: 0 };


    const recipes = {
        apple: { carbohydrate: 1, flavour: 2 },
        lemonade: { carbohydrate: 10, flavour: 20 },
        burger: { carbohydrate: 5, fat: 7, flavour: 3 },
        eggs: { protein: 5, fat: 1, flavour: 1 },
        turkey: { protein: 10, carbohydrate: 10, fat: 10, flavour: 10 },
    };

    const operation = {
        restock: (element, quantity) => {
            stock[element] += Number(quantity);
            return 'Success';
        },
        prepare: (meal, count) => {
            let ingrid = recipes[meal];

            for (let el in ingrid) {
                if (ingrid[el] * count > stock[el]) {
                    return `Error: not enough ${el} in stock`;
                }
            }
            for (let el in ingrid) {
                stock[el] -= ingrid[el] * count;
            };
            return 'Success';
        },
        report: () => {
            let res = [];
            for (let el in stock) {
                res.push(`${el}=${stock[el]}`)
            }
            return res.join(' ');
        }
    };

    return (line) => {
        [command, ...args] = line.split(' ');
        return operation[command].apply(null, args);
    }
}

let manager = solution();
console.log(manager('restock carbohydrate 10'))//', 'Success'],
console.log(manager('restock flavour 10'))//', 'Success'],
console.log(manager('prepare apple 1'))//, 'Success'],
console.log(manager('restock fat 10'))//, 'Success'],
console.log(manager('prepare burger 1'))//', 'Success'],
console.log(manager('report'))