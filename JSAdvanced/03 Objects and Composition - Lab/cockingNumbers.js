function solve(...params) {
    let num = Number(params.shift());
    const operation = {
        'chop': (x) => x / 2,
        'dice': (x) => Math.sqrt(x),
        'spice': (x) => x+1,
        'bake': (x) => x * 3,
        'fillet': (x) => x * 0.8,
    };
    params.forEach(function (element) {
        let res = operation[element](num)
        console.log(res);
        num = res;
    });
}