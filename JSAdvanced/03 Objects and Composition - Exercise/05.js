function solve(input) {
    let register = {};

    for (const row of input) {
        [town, product, price] = row.split(" | ");
        price = Number(price);

        let value = { town, price }

        if (!register[product]) {
            register[product] = [];
            register[product].push(value);
        } else {
            let valueArr = register[product];
            let alreadyExistTown = false;
            for (const innerObj of valueArr) {
                if (innerObj.town === town) {
                    innerObj.price = price;
                    alreadyExistTown = true;
                }
            }
            if (!alreadyExistTown) {
                valueArr.push(value)
            }
        }
    }

    for (const [key, value] of Object.entries(register)) {
        value.sort((a,b)=> a.price-b.price);
        console.log(`${key} -> ${value[0].price} (${value[0].town})`);
    }
}

solve(['Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
    'New York | Burger | 10',
]);


solve([
    'Sofia City | Audi | 100000',
    'Sofia City | BMW | 100000',
    'Sofia City | Mitsubishi | 10000',
    'Sofia City | Mercedes | 10000',
    'Sofia City | NoOffenseToCarLovers | 0',
    'Mexico City | Audi | 1000',
    'Mexico City | BMW | 99999',
    'New York City | Mitsubishi | 10000',
    'New York City | Mitsubishi | 1000',
    'Mexico City | Audi | 100000',
    'Washington City | Mercedes | 1000'
]
);