function solve (params){

    let colorie = {};
    for(let i=0; i<params.length; i+=2){
        let propName = params[i];
        let value = Number(params[i+1]);

        colorie[propName]=value;
    }
console.log(colorie);

}

solve(['Yoghurt', '48', 'Rise', '138','Apple','52']);