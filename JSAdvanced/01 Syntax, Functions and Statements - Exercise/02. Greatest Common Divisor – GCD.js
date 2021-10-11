function gcd(num1, num2){
    let res=1;
    for (let index = 1; index <=Math.min(num1,num2); index++) {
        if(num1%index===0 && num2%index===0){
            res=index
        }
    }
    console.log(res);
}

function gcd(num1, num2){
    let res=1;
    for (let index =Math.min(num1,num2); index>=1; index--) {
        if(num1%index===0 && num2%index===0){
            res=index;
            break;
        }
    }
    console.log(res);
}

gcd(2154, 458);