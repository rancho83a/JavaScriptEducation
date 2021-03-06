function solve(input) {
    let register = [];

    for (const row of input) {
        [town, product, price] = row.split(" | ");
        let alreadyExist = false;
        let canAdd = true;

        for (let i = 0; i < register.length; i++) {
            let item = register[i];

            if (item.hasOwnProperty(product) && item[product].town === town) {
                item[product].price = price;
                alreadyExist = true;

            }

            if (item.hasOwnProperty(product)) {
                if (price < item[product].price) {
                    delete register[i];
                    break;
                } else {
                    canAdd = false;
                }
            }

        }

        let prod = {
            [product]: {
                town,
                price
            }
        };
        // prod.toString = () => {
        //     let str;
        //     for (const key in prod) {
        //         str += prod[key];
        //         return str;
        //     }
        // }
            if (!alreadyExist && canAdd) {
                register.push(prod);
            }
        }

console.log(register);
       // register.forEach(el => console.log(el.toString()));


    }

    solve(['Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
    'New York | Burger | 10']);

    
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