const solve = (arr,rot)=> {
    while(rot-->0){
        arr.unshift(arr.pop());
    }
    return arr.join(' ');
}

console.log(solve(['1', 
'2', 
'3', 
'4'], 
2))