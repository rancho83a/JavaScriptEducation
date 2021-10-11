function solve(arr,criteria){

    let sorted= { 
        
        asc: (a,b)=> a-b,
        desc:(a,b)=> b-a,
    }



    return arr.sort(sorted[criteria]);
}
console.log(solve([14, 7, 17, 6, 8], 'desc'));