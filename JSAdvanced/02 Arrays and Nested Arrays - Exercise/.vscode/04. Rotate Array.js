const solve = (arr,steps) => {
    steps%=arr.length;
    while(steps-->0){
        let tmp = arr[arr.length-1];
        for(let i=arr.length-1; i>0;i--){
            arr[i]=arr[i-1];
        }
        arr[0]=tmp;
    }
    console.log(arr.join(' '));
}

solve(['1', 
'2', 
'3', 
'4'], 
2);

solve(['Banana', 
'Orange', 
'Coconut', 
'Apple'], 
15);