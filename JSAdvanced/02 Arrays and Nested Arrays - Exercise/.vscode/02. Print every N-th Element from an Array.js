const solve = (arr, num)=> {
    return arr.filter((el,i)=> i%num===0);
}

    //let res= [];
    // for (let i = 0; i < arr.length; i = i + num) {
    //     res.push(arr[i]);
    // }
    //return res;
//}
console.log(solve(['5',
    '20',
    '31',
    '4',
    '20'],
    2));

