const solve = (arr) =>{
let res=[]; res[0]=arr[0];
    for(let i=1; i<arr.length;i++){
        if(arr[i]>=res[res.length-1]){
                    res.push(arr[i]);
        }
    }
    return res;
} 

console.log(solve([1, 
    3, 
    8, 
    4, 
    10, 
    12, 
    3, 
    2, 
    24]))