function solve(...params) {
    let num = Number(params.shift());

    for (let cmd of params) {
        switch (cmd) {
            case 'chop': num /= 2;
                break;
            case 'dice': num = Math.sqrt(num);
                break;
            case 'spice': num++; break;
            case 'bake': num *= 3; break;
            case 'fillet': num *= 0.8; break;
        }
        console.log(num);

    }
}

solve('32', 'chop', 'chop', 'chop', 'chop', 'chop');