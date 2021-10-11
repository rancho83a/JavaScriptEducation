function solve(text){
    let res = text.toUpperCase()
    .match(/\w+/g)
    .join(", ");
    console.log(res);
}

solve('Hi, how are you?');