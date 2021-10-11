function creatRec(high, weigh){
const rect = {high, weigh};

rect.getArea = () => rect.high*rect.weigh;
    return rect;
}

const myRect = creatRec(5,5);
console.log(myRect);

console.log(myRect.getArea());