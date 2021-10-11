function solve(input) {
    class Car {
        constructor(brand, model, produced) {
            this.brand = brand;
            this.model = model;
            this.produced = produced
        }
    }

    let store = new Map();
    input.forEach(line => {
        [brand, model, produced] = line.split(' | ');
        produced = Number(produced);
        if (!store.has(brand)) {
            store.set(brand, []);
            store.get(brand).push(new Car(brand, model, produced))
        } else {
            if (!store.get(brand).some(c => c.model === model)) {
                store.get(brand).push(new Car(brand, model, produced));
            } else {
                store.get(brand).filter(c => c.model === model).map(c => c.produced += produced);
            }
        }
    });
    for ([k,v] of store){
        console.log(k);
        v.forEach(c => {
            console.log(`###${c.model} -> ${c.produced}`);
            
        });
    }
}

solve(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10']);