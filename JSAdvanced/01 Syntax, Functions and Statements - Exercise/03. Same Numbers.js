function solve(num) {
    let sum = 0;
    let lastSymbol=num%10;
    let isEquals=true;
    while (num !== 0) {
        let reminder = num % 10;
        if(lastSymbol!==reminder){
            isEquals=false;
        }
        sum += reminder;
        num = Math.floor(num / 10)
    }
    console.log(isEquals);
    console.log(sum);
}

solve(1111);