function solve (line1, line2,line3){
    let len1=line1.length;
    let len2=line2.length;
    let len3=line3.length;
    let summary = len1+len2+len3;
    let avg = Math.floor(summary/3);
    console.log(summary);
    console.log(avg);
}

solve('chocolate', 'ice cream', 'cake');

const variable = []; //empty array

console.log(variable == false); //evaluates true

if (variable) { console.log('True!') };

