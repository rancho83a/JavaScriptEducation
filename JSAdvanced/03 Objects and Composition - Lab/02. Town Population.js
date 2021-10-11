const solve = ( input) =>{

    let register = {};
    input.forEach(element => { 
      let [name, population] = element.split(" <-> ");
      population=Number(population);

      //if(register[name]!=undefined){
          if(Object.keys(register).includes(name)){
          population+=register[name];
      } 
      register[name] = population;
    });
    // for (let key in register) {
    //     console.log(key +" : " + register[key]);
    //     }

        for (let [k,v] of Object.entries(register)){
            console.log(k +" : " + v);
        }
    }

solve(['Istanbul <-> 100000',
'Honk Kong <-> 2100004',
'Jerusalem <-> 2352344',
'Mexico City <-> 23401925',
'Istanbul <-> 1000']);

solve(['Sofia <-> 1200000',
'Montana <-> 20000',
'New York <-> 10000000',
'Washington <-> 2345000',
'Las Vegas <-> 1000000']);