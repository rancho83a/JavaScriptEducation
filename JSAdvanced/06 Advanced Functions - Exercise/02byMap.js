function solve(...input){
    let resMap = new Map();

    input.forEach(el =>{
        let type =typeof(el);
        console.log( type+': '+el);
        if(!resMap.has(type)){
        resMap.set(type,0);
        } 
        resMap.set(type, resMap.get(type)+1)        
    });

    console.log([...resMap.entries()]);
    [...resMap.entries()].sort((a,b)=> b[1]-a[1])
    .forEach(el=> console.log(`${el[0]} = ${el[1]}`))

}

solve('cat', true, [4,5],42, 15,6,function () { console.log('Hello world!'); });