const solve = (commands) => {
let res=[];
for(let i=0; i<commands.length; i++){
    if(commands[i]==='add'){
        res.push(i+1);
    } else {
        res.pop();
    }
}
  if(!res.length)  console.log('Empty'); else console.log(res.join('\n'));
}

solve(['add', 
'add', 
'add', 
'add']
);

console.log([].pop());