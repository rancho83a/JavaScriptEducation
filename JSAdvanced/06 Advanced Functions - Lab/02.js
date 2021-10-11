function solution(num){
    return (value)=>num+value;
}
let add7 = solution(7);
console.log(add7(2));
console.log(add7(3));