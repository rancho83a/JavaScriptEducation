function evenElements(input){
    let res=[];
for(let i=0; i<input.length; i+=2)
res.push( input[i]);
console.log(res.join(' '));
}

evenElements(['20', '30', '40', '50', '60'])