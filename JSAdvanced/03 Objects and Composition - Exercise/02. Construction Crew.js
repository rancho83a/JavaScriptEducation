function solve (input){
if(input.dizziness){
    input.dizziness=false;
    input.levelOfHydrated+=input.weight*input.experience*0.1;
}


return input;
}

console.log(solve({ weight: 80,
    experience: 1,
    levelOfHydrated: 0,
    dizziness: true }));