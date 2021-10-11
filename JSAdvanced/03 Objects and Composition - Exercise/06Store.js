function solve(input) {
    let box = {}
    input.forEach(item => {
        let [product, price] = item.split(" : ");
        price = Number(price);
        let firstLetter = product[0];
        if (!box[firstLetter]) {
            box[firstLetter] = [];
        }
        box[firstLetter].push({ product, price });
        box[firstLetter].sort((a, b) => a.product.localeCompare(b.product));
    });

    Object.entries(box)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .forEach(item => { 
            let v = item[1].map(el => `${el.product}: ${el.price}`).join('\n');
            console.log(item[0] + '\n' + `${v}`);
        });
}
solve(['Banana : 2',
    "Rubic's Cube : 5",
    'Raspberry P : 4999',
    'Rolex : 100000',
    'Rollon : 10',
    'Rali Car : 2000000',
    'Pesho : 0.000001',
    'Barrel : 10']);
solve(['Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10']

)