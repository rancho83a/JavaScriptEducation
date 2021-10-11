function solve(arr){
        let sum=0;
        let sum2=0;
        let concat="";
        for (let index = 0; index < arr.length; index++) {
         const currentItem = arr[index]; 
             sum+= currentItem;
             sum2+=1/currentItem;
             concat+=currentItem    
        }
        console.log(sum);
        console.log(sum2);
        console.log(concat);
}
solve([1,2,3])


function task9(arr){
    aggregate(arr,0,(a,b)=>a+b);
    aggregate(arr,0,(a,b)=>a+1/b);
    aggregate(arr,'',(a,b)=>a+b);

    function aggregate(items,initVal, func){
        let val = initVal;
        for(let i=0; i<items.length; i++){
            val =func(val, items[i]);
        }
        console.log(val);
    }
}
task9([1,2,3])