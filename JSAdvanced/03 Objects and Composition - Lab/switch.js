let count =5;

function operations (...input){
    let num = Number(input.shift());
    const operator ={
        'chop': x => x/2,
        'dice': x => Math.sqrt(x),
        'spice': x => x+1,
        'bake': x => x*3,
        'fillet': x => x*0.8,
    }

    input.forEach(el=> console.log(num=operator[el](num)));
}
(operations('32', 'chop', 'chop', 'chop', 'chop', 'chop'));