function solve(input) {
    const factoryBuild = () => {
        let car = {};
        return {
            create: (name, inherit, parentName) => car[name] = inherit ? Object.create(car[parentName]) : {},
            set: (name, key, value) => car[name][key] = value,
            print: (name) => {
                let res = [];
                for (let key in car[name]) {
                    res.push(`${key}:${car[name][key]}`);
                }
                console.log(res.join(', '));
            },
        };
    };

    let carFactory = factoryBuild();

    input
        .map(x => x.split(' '))
        .forEach(([
            command, ...args
        ]) => carFactory[command].apply(null, args));
}

solve(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2']);
