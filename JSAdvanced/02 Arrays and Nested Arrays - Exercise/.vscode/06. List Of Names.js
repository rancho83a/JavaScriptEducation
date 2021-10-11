const solve = (arr) => {
       arr.sort((a,b)=> a.localeCompare(b))
       .forEach((el,ind) => {
           console.log(ind+1+"."+el) 
       });
}
solve(["John", "Bob", "Christina", "Ema"]);