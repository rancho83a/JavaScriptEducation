function solve() {
    let firstNum;
    let secondNum;
    let res;

    return {
        init: (selector1, selector2, resultSelector) => {
            firstNum = document.querySelector(selector1);
            secondNum = document.querySelector(selector2);
            res = document.querySelector(resultSelector);
        },
        add: () => {
                res.value = Number(firstNum.value) + Number(secondNum.value);
            
        },
        subtract: () => {
         
                res.value = Number(firstNum.value) - Number(secondNum.value);
        }
    }
}
let ex = solve();

ex.init('#num1','#num2','#result');
document.querySelector('#sumButton').addEventListener('click', ex.add);
document.querySelector('#subtractButton').addEventListener('click', ex.subtract);
