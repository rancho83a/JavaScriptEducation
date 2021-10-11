
let arr = [
    ['s',4],
    ['g','t'],
    ['j',3],
];
let arrObj = {
    f:4,
    fd:5,
    d:7
} 


let obj = Object.fromEntries(
Object.entries(arrObj).sort((a,b)=> [,b]-[,a])
);

let sortedObj = Object.assign({}, obj);
console.log(sortedObj);
obj.d=8;
console.log(obj);
console.log(sortedObj);