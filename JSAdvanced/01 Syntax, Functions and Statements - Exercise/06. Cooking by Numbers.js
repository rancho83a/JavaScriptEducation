function solve(...params) {
    let num = Number(params.shift());
    const operation = {
        'chop': (x) => x / 2,
        'dice': (x) => Math.sqrt(x),
        'spice': (x) => x+1,
        'bake': (x) => x * 3,
        'fillet': (x) => x * 0.8,
    };
   // params.forEach(function (element) {
       for (let i=0; i<params.length; i++){
        let res = operation[params[i]](num)
        console.log(res);
        num = res;
    };
}
solve('32', 'chop', 'chop', 'chop', 'chop', 'chop');
solve('9', 'dice', 'spice', 'chop', 'bake', 'fillet');