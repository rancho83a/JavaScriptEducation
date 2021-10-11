function calc(a, b, operation) {
    let res;
    operation === '+' ? res = a + b
        : operation === '-' ? res = a - b
            : operation === '/' ? res = (a / b)//.toFixed(2)
                : operation === '*' ? res = a * b
                    : operation === '%' ? res = a % b
                        : res = a ** b;

    console.log(res);
}

calc(3, 2, '%');

let s="j";
s.length.toString
