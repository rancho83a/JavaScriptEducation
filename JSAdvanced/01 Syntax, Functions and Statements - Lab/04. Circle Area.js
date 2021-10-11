function solve(radius){
    let area = ""
    let type = typeof (radius);
    if (type==='number'){
        area = Math.PI*radius**2;
        console.log(area.toFixed(2));
    } else {
        console.log(`We can not calculate the circle area, because we receive a ${type}.`)

    }
}

solve(5);