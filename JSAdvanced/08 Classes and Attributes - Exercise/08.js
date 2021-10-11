function solve(input) {
    class Jiuce {
        constructor(fruit, quantity) {
            this.fruit = fruit;
            this.quantity = quantity
            this.botles = 0;
        }

        makeBotle() {
            if (this.quantity >= 1000) {
                this.botles += Math.trunc(this.quantity / 1000);
                this.quantity %= 1000;
            }
        }
    }

    let arr = [];
    let res = new Set();
    input.forEach(line => {
        [fruit, quantity] = line.split(' => ');
        if (!arr[fruit]) {
            arr[fruit] = [];
            arr[fruit].push((new Jiuce(fruit, 0)))
        }
        let currentFruit = arr[fruit][0];
        currentFruit.quantity += Number(quantity);
        currentFruit.makeBotle();

        if (currentFruit.botles > 0) {
            res.add(fruit)
        }
    });

    res.forEach(f => {
        console.log(f + ' => ' + arr[f][0].botles);
    });
}

solve(['Orange => 2000',
    'Peach => 1432',
    'Banana => 450',
    'Peach => 600',
    'Strawberry => 549']);