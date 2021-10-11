function solve(numbers) {
  let  index = Math.floor(numbers.length / 2);
 // console.log(numbers);
  numbers.sort((a, b) => a - b);
 // console.log(numbers);
    let res = numbers.slice(index);
    return res;
}
//console.log(solve([3, 19, 14, 7, 2, 19, 6]));
//console.log(6);
console.log(solve([4, 7, 2, 5]));

