function solve(...input){
    let res ={}

    input.forEach(el =>{
        let type =typeof(el);
        console.log( type+': '+el);
        if(!res[type]){
        res[type]=1;
        } else{
            res[type]++;
        }
    })
    console.log(Object.entries(res));
    const sortable = Object.fromEntries(
        Object.entries(res).sort(([,a],[,b]) => b-a));
        console.log(Object.entries(sortable).map(([k,v])=> `${k} = ${v}`).join('\n'));   
}

solve('cat', true, [4,5],42, 15,6,function () { console.log('Hello world!'); });